import { randomUUID } from "crypto";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";
import type {
  AdminUser,
  MembershipPlan,
  Payment,
  PaymentStatus,
  Prize,
  PrizeInput,
  Subscriber,
  SubscriberStatus,
  SubscriberUpdateInput,
  Subscription,
  SubscriptionStatus,
  SubscriptionUpdateInput,
  UserRole,
  UserStatus,
  UserUpdateInput,
  Winner,
  WinnerInput,
} from "./content-types";
import { DEFAULT_PRIZE_SEED } from "./prize-seed";

type PaidMembershipPlan = Exclude<MembershipPlan, "none">;

const MEMBERSHIP_PLANS: MembershipPlan[] = ["none", "silver", "gold"];
const PAID_MEMBERSHIP_PLANS: PaidMembershipPlan[] = ["silver", "gold"];
const SUBSCRIBER_STATUSES: SubscriberStatus[] = ["active", "unsubscribed"];
const USER_STATUSES: UserStatus[] = ["active", "blocked"];
const USER_ROLES: UserRole[] = ["user", "admin"];
const SUBSCRIPTION_STATUSES: SubscriptionStatus[] = ["active", "expired"];
const PAYMENT_STATUSES: PaymentStatus[] = ["success", "failed", "pending"];
const DEFAULT_SUBSCRIPTION_DAYS = 30;

const COLLECTIONS = {
  winners: "winners",
  prizes: "prizes",
  subscribers: "subscribers",
  subscriptions: "subscriptions",
  payments: "payments",
  users: "users",
} as const;

declare global {
  var _contentStoreIndexesPromise: Promise<void> | undefined;
  var _prizeSeedPromise: Promise<void> | undefined;
  var _prizeMigrationPromise: Promise<void> | undefined;
}

function normalizeMembershipPlan(
  value: unknown,
  fallback: MembershipPlan = "none",
): MembershipPlan {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return MEMBERSHIP_PLANS.find((plan) => plan === normalized) ?? fallback;
}

function isPaidPlan(plan: MembershipPlan): plan is PaidMembershipPlan {
  return PAID_MEMBERSHIP_PLANS.includes(plan as PaidMembershipPlan);
}

function normalizeSubscriberStatus(value: unknown): SubscriberStatus {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return SUBSCRIBER_STATUSES.find((status) => status === normalized) ?? "active";
}

function normalizeUserStatus(value: unknown): UserStatus {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return USER_STATUSES.find((status) => status === normalized) ?? "active";
}

function normalizeUserRole(value: unknown): UserRole {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return USER_ROLES.find((role) => role === normalized) ?? "user";
}

function normalizePaymentStatus(value: unknown): PaymentStatus {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  return PAYMENT_STATUSES.find((status) => status === normalized) ?? "pending";
}

function normalizeIsoDate(value: unknown, fallback = new Date().toISOString()) {
  if (typeof value !== "string") {
    return fallback;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }

  return parsed.toISOString();
}

function isExpired(dateIso: string) {
  const parsed = new Date(dateIso);
  if (Number.isNaN(parsed.getTime())) {
    return true;
  }

  return parsed.getTime() < Date.now();
}

function normalizeSubscriptionStatus(
  value: unknown,
  expiresAt: string,
): SubscriptionStatus {
  const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
  const explicit = SUBSCRIPTION_STATUSES.find((status) => status === normalized);
  if (explicit) {
    return explicit;
  }

  return isExpired(expiresAt) ? "expired" : "active";
}

function addDays(dateIso: string, days: number) {
  const base = new Date(dateIso);
  if (Number.isNaN(base.getTime())) {
    return new Date().toISOString();
  }

  base.setDate(base.getDate() + days);
  return base.toISOString();
}

function normalizeName(name: unknown, email: string) {
  if (typeof name === "string" && name.trim()) {
    return name.trim();
  }

  const prefix = email.split("@")[0] ?? "Member";
  return prefix
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function asObject(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return value as Record<string, unknown>;
}

function getString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function legacyDateLabelToIso(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  const normalized = value.trim().toUpperCase();
  const match = normalized.match(/^([A-Z]+)\s*([0-9]{1,2})$/);
  if (!match) {
    return "";
  }

  const monthMap: Record<string, number> = {
    JANUARY: 0,
    FEBRUARY: 1,
    MARCH: 2,
    APRIL: 3,
    MAY: 4,
    JUNE: 5,
    JULY: 6,
    AUGUST: 7,
    SEPTEMBER: 8,
    OCTOBER: 9,
    NOVEMBER: 10,
    DECEMBER: 11,
  };

  const month = monthMap[match[1]];
  const day = Number(match[2]);

  if (month === undefined || !Number.isInteger(day) || day < 1 || day > 31) {
    return "";
  }

  const year = new Date().getUTCFullYear();
  return new Date(Date.UTC(year, month, day)).toISOString();
}

function getDocId(value: unknown) {
  const record = asObject(value);
  const id = getString(record.id).trim();
  if (id) {
    return id;
  }

  const objectId = record._id;
  if (objectId instanceof ObjectId) {
    return objectId.toString();
  }

  if (typeof objectId === "string" && objectId.trim()) {
    return objectId.trim();
  }

  return randomUUID();
}

function buildIdFilter(id: string) {
  const normalized = id.trim();
  if (/^[a-f0-9]{24}$/i.test(normalized)) {
    return {
      $or: [{ id: normalized }, { _id: new ObjectId(normalized) }],
    };
  }

  return { id: normalized };
}

function mapWinner(raw: unknown): Winner | null {
  const record = asObject(raw);
  const name = getString(record.name).trim();
  const prize = getString(record.prize).trim();

  if (!name || !prize) {
    return null;
  }

  const now = new Date().toISOString();

  return {
    id: getDocId(record),
    name,
    prize,
    location: getString(record.location).trim(),
    imageUrl: getString(record.imageUrl).trim(),
    announcedAt: normalizeIsoDate(record.announcedAt, now),
    isPublished: typeof record.isPublished === "boolean" ? record.isPublished : true,
    createdAt: normalizeIsoDate(record.createdAt, now),
    updatedAt: normalizeIsoDate(record.updatedAt, now),
  };
}

function mapPrize(raw: unknown): Prize | null {
  const record = asObject(raw);
  const drawDate = normalizeIsoDate(
    record.drawDate,
    legacyDateLabelToIso(record.dateLabel),
  );
  const points = normalizeStringArray(record.points);

  if (!drawDate || points.length === 0) {
    return null;
  }

  const now = new Date().toISOString();

  return {
    id: getDocId(record),
    drawDate,
    imageUrl: getString(record.imageUrl).trim(),
    imageKey: getString(record.imageKey).trim(),
    points,
    isPublished: typeof record.isPublished === "boolean" ? record.isPublished : true,
    createdAt: normalizeIsoDate(record.createdAt, now),
    updatedAt: normalizeIsoDate(record.updatedAt, now),
  };
}

function mapSubscriber(raw: unknown): Subscriber | null {
  const record = asObject(raw);
  const email = getString(record.email).trim().toLowerCase();
  if (!email) {
    return null;
  }

  return {
    id: getDocId(record),
    email,
    plan: normalizeMembershipPlan(record.plan, "silver"),
    source: getString(record.source).trim() || "website",
    status: normalizeSubscriberStatus(record.status),
    createdAt: normalizeIsoDate(record.createdAt),
  };
}

function mapUser(raw: unknown): AdminUser | null {
  const record = asObject(raw);
  const email = getString(record.email).trim().toLowerCase();

  if (!email) {
    return null;
  }

  const joinedAt = normalizeIsoDate(
    record.createdAt ?? record.joinedAt,
    new Date().toISOString(),
  );

  return {
    id: getDocId(record),
    name: normalizeName(record.name, email),
    email,
    plan: normalizeMembershipPlan(record.plan, "none"),
    status: normalizeUserStatus(record.status),
    role: normalizeUserRole(record.role),
    joinedAt,
    updatedAt: normalizeIsoDate(record.updatedAt, joinedAt),
  };
}

function mapSubscription(raw: unknown): Subscription | null {
  const record = asObject(raw);
  const userEmail = getString(record.userEmail).trim().toLowerCase();

  if (!userEmail) {
    return null;
  }

  const createdAt = normalizeIsoDate(record.createdAt);
  const expiresAt = normalizeIsoDate(
    record.expiresAt,
    addDays(createdAt, DEFAULT_SUBSCRIPTION_DAYS),
  );

  return {
    id: getDocId(record),
    userId: getString(record.userId).trim() || getDocId(record),
    userName: normalizeName(record.userName, userEmail),
    userEmail,
    plan: normalizeMembershipPlan(record.plan, "silver"),
    status: normalizeSubscriptionStatus(record.status, expiresAt),
    expiresAt,
    createdAt,
    updatedAt: normalizeIsoDate(record.updatedAt, createdAt),
  };
}

function mapPayment(raw: unknown): Payment | null {
  const record = asObject(raw);
  const userEmail = getString(record.userEmail).trim().toLowerCase();

  if (!userEmail) {
    return null;
  }

  const amountRaw = record.amount;
  const amount = typeof amountRaw === "number" ? amountRaw : Number(amountRaw);

  return {
    id: getDocId(record),
    userId: getString(record.userId).trim() || getDocId(record),
    userName: normalizeName(record.userName, userEmail),
    userEmail,
    amount: Number.isFinite(amount) ? amount : 0,
    plan: normalizeMembershipPlan(record.plan, "silver"),
    paymentId:
      getString(record.paymentId).trim() || `manual_${randomUUID().slice(0, 8)}`,
    status: normalizePaymentStatus(record.status),
    createdAt: normalizeIsoDate(record.createdAt),
  };
}

async function ensureIndexes() {
  if (global._contentStoreIndexesPromise) {
    return global._contentStoreIndexesPromise;
  }

  const runner = (async () => {
    const db = await getDb();

    await Promise.all([
      db.collection(COLLECTIONS.winners).createIndex({ id: 1 }, { unique: true, sparse: true }),
      db.collection(COLLECTIONS.winners).createIndex({ isPublished: 1, announcedAt: -1 }),
      db.collection(COLLECTIONS.prizes).createIndex({ id: 1 }, { unique: true, sparse: true }),
      db.collection(COLLECTIONS.prizes).createIndex({ isPublished: 1, drawDate: 1, createdAt: -1 }),
      db.collection(COLLECTIONS.subscribers).createIndex({ email: 1 }, { unique: true }),
      db.collection(COLLECTIONS.subscriptions).createIndex({ userId: 1 }, { unique: true }),
      db.collection(COLLECTIONS.subscriptions).createIndex({ userEmail: 1 }),
      db.collection(COLLECTIONS.payments).createIndex({ id: 1 }, { unique: true, sparse: true }),
      db.collection(COLLECTIONS.users).createIndex({ email: 1 }, { unique: true }),
    ]);
  })();

  global._contentStoreIndexesPromise = runner;
  await runner;
}

async function getCollections() {
  await ensureIndexes();
  const db = await getDb();

  return {
    winners: db.collection(COLLECTIONS.winners),
    prizes: db.collection(COLLECTIONS.prizes),
    subscribers: db.collection(COLLECTIONS.subscribers),
    subscriptions: db.collection(COLLECTIONS.subscriptions),
    payments: db.collection(COLLECTIONS.payments),
    users: db.collection(COLLECTIONS.users),
  };
}

async function findUserByEmail(email: string) {
  const { users } = await getCollections();
  return users.findOne({ email });
}

async function ensureUserRecord(options: {
  email: string;
  name?: string;
  plan: MembershipPlan;
  role?: UserRole;
  status?: UserStatus;
}) {
  const { users } = await getCollections();
  const now = new Date().toISOString();
  const normalizedEmail = options.email.trim().toLowerCase();

  const existing = await users.findOne({ email: normalizedEmail });

  if (existing) {
    const nextName = options.name?.trim()
      ? options.name.trim()
      : normalizeName(existing.name, normalizedEmail);

    await users.updateOne(
      { _id: existing._id },
      {
        $set: {
          name: nextName,
          plan: options.plan,
          role: options.role ?? normalizeUserRole(existing.role),
          status: options.status ?? normalizeUserStatus(existing.status),
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
    );

    return users.findOne({ _id: existing._id });
  }

  const insertResult = await users.insertOne({
    name: normalizeName(options.name, normalizedEmail),
    email: normalizedEmail,
    role: options.role ?? "user",
    plan: options.plan,
    status: options.status ?? "active",
    createdAt: now,
    updatedAt: now,
  });

  return users.findOne({ _id: insertResult.insertedId });
}

async function removeSubscriptionRecords(email: string, userId?: string) {
  const { subscriptions } = await getCollections();
  const normalizedEmail = email.trim().toLowerCase();

  const filter = userId
    ? {
        $or: [{ userId }, { userEmail: normalizedEmail }],
      }
    : { userEmail: normalizedEmail };

  await subscriptions.deleteMany(filter);
}

async function removeMembershipRecords(email: string, userId?: string) {
  const { subscribers } = await getCollections();
  await removeSubscriptionRecords(email, userId);
  await subscribers.deleteMany({ email: email.trim().toLowerCase() });
}

async function upsertSubscriberRecord(
  email: string,
  plan: PaidMembershipPlan,
  source: string,
  status: SubscriberStatus = "active",
) {
  const { subscribers } = await getCollections();
  const now = new Date().toISOString();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedSource = source.trim() || "website";

  const existing = await subscribers.findOne({ email: normalizedEmail });

  if (existing) {
    await subscribers.updateOne(
      { _id: existing._id },
      {
        $set: {
          plan,
          source: normalizedSource,
          status,
          updatedAt: now,
        },
      },
    );

    return subscribers.findOne({ _id: existing._id });
  }

  const result = await subscribers.insertOne({
    id: randomUUID(),
    email: normalizedEmail,
    plan,
    source: normalizedSource,
    status,
    createdAt: now,
    updatedAt: now,
  });

  return subscribers.findOne({ _id: result.insertedId });
}

async function upsertSubscriptionForUser(options: {
  userId: string;
  userEmail: string;
  userName: string;
  plan: PaidMembershipPlan;
  status?: SubscriptionStatus;
  expiresAt?: string;
}) {
  const { subscriptions } = await getCollections();
  const now = new Date().toISOString();
  const fallbackExpiry = addDays(now, DEFAULT_SUBSCRIPTION_DAYS);

  const existing = await subscriptions.findOne({ userId: options.userId });

  if (existing) {
    const existingExpiry = normalizeIsoDate(existing.expiresAt, fallbackExpiry);
    const nextExpiresAt = options.expiresAt
      ? normalizeIsoDate(options.expiresAt, existingExpiry)
      : existing.status === "expired" || isExpired(existingExpiry)
        ? fallbackExpiry
        : existingExpiry;

    const nextStatus = options.status
      ? normalizeSubscriptionStatus(options.status, nextExpiresAt)
      : isExpired(nextExpiresAt)
        ? "expired"
        : "active";

    await subscriptions.updateOne(
      { _id: existing._id },
      {
        $set: {
          userName: options.userName,
          userEmail: options.userEmail,
          plan: options.plan,
          status: nextStatus,
          expiresAt: nextExpiresAt,
          updatedAt: now,
        },
      },
    );

    return subscriptions.findOne({ _id: existing._id });
  }

  const initialExpiresAt = options.expiresAt
    ? normalizeIsoDate(options.expiresAt, fallbackExpiry)
    : fallbackExpiry;

  const result = await subscriptions.insertOne({
    id: randomUUID(),
    userId: options.userId,
    userName: options.userName,
    userEmail: options.userEmail,
    plan: options.plan,
    status: options.status
      ? normalizeSubscriptionStatus(options.status, initialExpiresAt)
      : "active",
    expiresAt: initialExpiresAt,
    createdAt: now,
    updatedAt: now,
  });

  return subscriptions.findOne({ _id: result.insertedId });
}

export async function listWinners(options?: { publishedOnly?: boolean }) {
  const { winners } = await getCollections();

  const docs = await winners
    .find(options?.publishedOnly ? { isPublished: true } : {})
    .sort({ announcedAt: -1 })
    .toArray();

  return docs.map(mapWinner).filter((winner): winner is Winner => winner !== null);
}

export async function createWinner(input: WinnerInput): Promise<Winner> {
  const { winners } = await getCollections();
  const now = new Date().toISOString();

  const payload = {
    id: randomUUID(),
    name: input.name.trim(),
    prize: input.prize.trim(),
    location: input.location?.trim() ?? "",
    imageUrl: input.imageUrl?.trim() ?? "",
    announcedAt: input.announcedAt ? normalizeIsoDate(input.announcedAt, now) : now,
    isPublished: input.isPublished ?? true,
    createdAt: now,
    updatedAt: now,
  };

  const result = await winners.insertOne(payload);
  const created = await winners.findOne({ _id: result.insertedId });
  const mapped = mapWinner(created);

  if (!mapped) {
    throw new Error("Failed to create winner");
  }

  return mapped;
}

export async function updateWinner(
  id: string,
  input: Partial<WinnerInput>,
): Promise<Winner | null> {
  const { winners } = await getCollections();
  const existing = await winners.findOne(buildIdFilter(id));

  if (!existing) {
    return null;
  }

  const current = mapWinner(existing);
  if (!current) {
    return null;
  }

  const updates = {
    name: input.name !== undefined ? input.name.trim() : current.name,
    prize: input.prize !== undefined ? input.prize.trim() : current.prize,
    location: input.location !== undefined ? input.location.trim() : current.location,
    imageUrl: input.imageUrl !== undefined ? input.imageUrl.trim() : current.imageUrl,
    announcedAt:
      input.announcedAt !== undefined
        ? normalizeIsoDate(input.announcedAt, current.announcedAt)
        : current.announcedAt,
    isPublished:
      input.isPublished !== undefined ? input.isPublished : current.isPublished,
    updatedAt: new Date().toISOString(),
  };

  await winners.updateOne({ _id: existing._id }, { $set: updates });
  const updated = await winners.findOne({ _id: existing._id });

  return mapWinner(updated);
}

export async function deleteWinner(id: string) {
  const { winners } = await getCollections();
  const result = await winners.deleteOne(buildIdFilter(id));
  return result.deletedCount > 0;
}

async function seedPrizesIfEmpty() {
  if (global._prizeSeedPromise) {
    return global._prizeSeedPromise;
  }

  const runner = (async () => {
    const { prizes } = await getCollections();
    const count = await prizes.estimatedDocumentCount();
    if (count > 0) {
      return;
    }

    const now = new Date().toISOString();
    const payload = DEFAULT_PRIZE_SEED.map((item) => ({
      id: randomUUID(),
      drawDate: normalizeIsoDate(item.drawDate, now),
      imageUrl: item.imageUrl?.trim() ?? "",
      imageKey: item.imageKey?.trim() ?? "",
      points: item.points.map((point) => point.trim()).filter(Boolean),
      isPublished: item.isPublished ?? true,
      createdAt: now,
      updatedAt: now,
    }));

    if (payload.length > 0) {
      await prizes.insertMany(payload, { ordered: false });
    }
  })();

  global._prizeSeedPromise = runner;
  await runner;
}

async function migrateLegacyPrizeDates() {
  if (global._prizeMigrationPromise) {
    return global._prizeMigrationPromise;
  }

  const runner = (async () => {
    const { prizes } = await getCollections();
    const cursor = prizes.find({
      $or: [{ drawDate: { $exists: false } }, { drawDate: null }, { drawDate: "" }],
      dateLabel: { $exists: true },
    });

    const updates: Promise<unknown>[] = [];

    for await (const doc of cursor) {
      const record = asObject(doc);
      const fallbackIso = legacyDateLabelToIso(record.dateLabel);
      if (!fallbackIso) {
        continue;
      }

      updates.push(
        prizes.updateOne(
          { _id: record._id as ObjectId },
          {
            $set: {
              drawDate: fallbackIso,
              updatedAt: new Date().toISOString(),
            },
          },
        ),
      );
    }

    if (updates.length > 0) {
      await Promise.all(updates);
    }
  })();

  global._prizeMigrationPromise = runner;
  await runner;
}

export async function listPrizes(options?: {
  publishedOnly?: boolean;
  limit?: number;
}) {
  await seedPrizesIfEmpty();
  await migrateLegacyPrizeDates();
  const { prizes } = await getCollections();
  const filter: Record<string, unknown> = {
    drawDate: { $type: "string", $ne: "" },
  };

  if (options?.publishedOnly) {
    filter.isPublished = true;
  }

  const limit =
    typeof options?.limit === "number" &&
    Number.isFinite(options.limit) &&
    options.limit > 0
      ? Math.min(Math.floor(options.limit), 100)
      : null;

  const cursor = prizes
    .find(filter)
    .sort({ drawDate: 1, createdAt: -1 });

  if (limit) {
    cursor.limit(limit);
  }

  const docs = await cursor.toArray();
  return docs.map(mapPrize).filter((prize): prize is Prize => prize !== null);
}

export async function createPrize(input: PrizeInput): Promise<Prize> {
  const { prizes } = await getCollections();
  const now = new Date().toISOString();
  const points = input.points.map((point) => point.trim()).filter(Boolean);

  const payload = {
    id: randomUUID(),
    drawDate: normalizeIsoDate(input.drawDate, now),
    imageUrl: input.imageUrl?.trim() ?? "",
    imageKey: input.imageKey?.trim() ?? "",
    points,
    isPublished: input.isPublished ?? true,
    createdAt: now,
    updatedAt: now,
  };

  const result = await prizes.insertOne(payload);
  const created = await prizes.findOne({ _id: result.insertedId });
  const mapped = mapPrize(created);

  if (!mapped) {
    throw new Error("Failed to create prize");
  }

  return mapped;
}

export async function updatePrize(
  id: string,
  input: Partial<PrizeInput>,
): Promise<Prize | null> {
  const { prizes } = await getCollections();
  const existing = await prizes.findOne(buildIdFilter(id));

  if (!existing) {
    return null;
  }

  const current = mapPrize(existing);
  if (!current) {
    return null;
  }

  const points =
    input.points !== undefined
      ? input.points.map((point) => point.trim()).filter(Boolean)
      : current.points;

  const updates = {
    drawDate:
      input.drawDate !== undefined
        ? normalizeIsoDate(input.drawDate, current.drawDate)
        : current.drawDate,
    imageUrl:
      input.imageUrl !== undefined ? input.imageUrl.trim() : current.imageUrl,
    imageKey:
      input.imageKey !== undefined ? input.imageKey.trim() : current.imageKey,
    points,
    isPublished:
      input.isPublished !== undefined ? input.isPublished : current.isPublished,
    updatedAt: new Date().toISOString(),
  };

  await prizes.updateOne({ _id: existing._id }, { $set: updates });
  const updated = await prizes.findOne({ _id: existing._id });
  return mapPrize(updated);
}

export async function deletePrize(id: string) {
  const { prizes } = await getCollections();
  const result = await prizes.deleteOne(buildIdFilter(id));
  return result.deletedCount > 0;
}

export async function listSubscribers() {
  const { subscribers } = await getCollections();
  const docs = await subscribers.find({}).sort({ createdAt: -1 }).toArray();
  return docs
    .map(mapSubscriber)
    .filter((subscriber): subscriber is Subscriber => subscriber !== null);
}

export async function upsertSubscriber(
  email: string,
  source = "website",
  plan: MembershipPlan = "silver",
) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPlan = normalizeMembershipPlan(plan, "silver");

  if (!isPaidPlan(normalizedPlan)) {
    throw new Error("Subscriber plan must be silver or gold");
  }

  const subscriberDoc = await upsertSubscriberRecord(
    normalizedEmail,
    normalizedPlan,
    source,
    "active",
  );

  const userDoc = await ensureUserRecord({
    email: normalizedEmail,
    plan: normalizedPlan,
  });

  const user = mapUser(userDoc);
  if (!user) {
    throw new Error("Failed to resolve subscriber user");
  }

  await upsertSubscriptionForUser({
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    plan: normalizedPlan,
  });

  const mappedSubscriber = mapSubscriber(subscriberDoc);
  if (!mappedSubscriber) {
    throw new Error("Failed to upsert subscriber");
  }

  return mappedSubscriber;
}

export async function updateSubscriber(
  id: string,
  input: SubscriberUpdateInput,
): Promise<Subscriber | null> {
  const { subscribers, users } = await getCollections();

  const existing = await subscribers.findOne(buildIdFilter(id));
  if (!existing) {
    return null;
  }

  const current = mapSubscriber(existing);
  if (!current) {
    return null;
  }

  const nextPlan =
    input.plan !== undefined
      ? normalizeMembershipPlan(input.plan, current.plan)
      : current.plan;
  const nextStatus =
    input.status !== undefined
      ? normalizeSubscriberStatus(input.status)
      : current.status;

  const now = new Date().toISOString();

  await subscribers.updateOne(
    { _id: existing._id },
    {
      $set: {
        plan: nextPlan,
        status: nextStatus,
        updatedAt: now,
      },
    },
  );

  const userDoc = await findUserByEmail(current.email);

  if (userDoc) {
    const userId = getDocId(userDoc);

    if (nextStatus === "unsubscribed" || !isPaidPlan(nextPlan)) {
      await users.updateOne(
        { _id: userDoc._id },
        {
          $set: {
            plan: "none",
            updatedAt: now,
          },
        },
      );
      await removeSubscriptionRecords(current.email, userId);
    } else {
      await users.updateOne(
        { _id: userDoc._id },
        {
          $set: {
            plan: nextPlan,
            updatedAt: now,
          },
        },
      );

      await upsertSubscriptionForUser({
        userId,
        userEmail: current.email,
        userName: normalizeName(userDoc.name, current.email),
        plan: nextPlan,
      });
    }
  }

  const updated = await subscribers.findOne({ _id: existing._id });
  return mapSubscriber(updated);
}

export async function upsertUserAccount(input: {
  name?: string;
  email: string;
  plan?: MembershipPlan;
  role?: UserRole;
  source?: string;
}) {
  const normalizedEmail = input.email.trim().toLowerCase();
  const normalizedPlan = normalizeMembershipPlan(input.plan, "none");

  const userDoc = await ensureUserRecord({
    email: normalizedEmail,
    name: input.name,
    plan: normalizedPlan,
    role: input.role,
  });

  const user = mapUser(userDoc);
  if (!user) {
    throw new Error("Failed to upsert user");
  }

  if (isPaidPlan(normalizedPlan)) {
    await upsertSubscriberRecord(
      normalizedEmail,
      normalizedPlan,
      input.source?.trim() || "auth-form",
      "active",
    );

    await upsertSubscriptionForUser({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      plan: normalizedPlan,
    });
  } else {
    await removeMembershipRecords(user.email, user.id);
  }

  return user;
}

export async function listUsers() {
  const { users } = await getCollections();
  const docs = await users
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: -1, joinedAt: -1 })
    .toArray();

  return docs
    .map(mapUser)
    .filter((user): user is AdminUser => user !== null)
    .sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
}

export async function updateUser(
  id: string,
  input: UserUpdateInput,
): Promise<AdminUser | null> {
  const { users } = await getCollections();
  const existing = await users.findOne(buildIdFilter(id));

  if (!existing) {
    return null;
  }

  const current = mapUser(existing);
  if (!current) {
    return null;
  }

  const now = new Date().toISOString();

  const nextPlan =
    input.plan !== undefined
      ? normalizeMembershipPlan(input.plan, current.plan)
      : current.plan;

  await users.updateOne(
    { _id: existing._id },
    {
      $set: {
        name:
          input.name !== undefined
            ? normalizeName(input.name, current.email)
            : current.name,
        plan: nextPlan,
        status:
          input.status !== undefined
            ? normalizeUserStatus(input.status)
            : current.status,
        role:
          input.role !== undefined
            ? normalizeUserRole(input.role)
            : current.role,
        updatedAt: now,
      },
    },
  );

  const updated = await users.findOne({ _id: existing._id });
  const mapped = mapUser(updated);

  if (!mapped) {
    return null;
  }

  if (isPaidPlan(nextPlan)) {
    await upsertSubscriberRecord(mapped.email, nextPlan, "admin-dashboard", "active");
    await upsertSubscriptionForUser({
      userId: mapped.id,
      userEmail: mapped.email,
      userName: mapped.name,
      plan: nextPlan,
    });
  } else {
    await removeMembershipRecords(mapped.email, mapped.id);
  }

  return mapped;
}

export async function listSubscriptions() {
  const { subscriptions } = await getCollections();
  const docs = await subscriptions.find({}).sort({ updatedAt: -1 }).toArray();
  return docs
    .map(mapSubscription)
    .filter((subscription): subscription is Subscription => subscription !== null);
}

export async function updateSubscription(
  id: string,
  input: SubscriptionUpdateInput,
): Promise<Subscription | null> {
  const { subscriptions, users } = await getCollections();
  const existing = await subscriptions.findOne(buildIdFilter(id));

  if (!existing) {
    return null;
  }

  const current = mapSubscription(existing);
  if (!current) {
    return null;
  }

  const nowIso = new Date().toISOString();

  const nextPlan =
    input.plan !== undefined
      ? normalizeMembershipPlan(input.plan, current.plan)
      : current.plan;

  let nextExpiresAt =
    input.expiresAt !== undefined
      ? normalizeIsoDate(input.expiresAt, current.expiresAt)
      : current.expiresAt;

  if (
    typeof input.extendDays === "number" &&
    Number.isFinite(input.extendDays) &&
    input.extendDays > 0
  ) {
    const base = isExpired(nextExpiresAt) ? nowIso : nextExpiresAt;
    nextExpiresAt = addDays(base, Math.round(input.extendDays));
  }

  const nextStatus =
    input.status !== undefined
      ? normalizeSubscriptionStatus(input.status, nextExpiresAt)
      : isExpired(nextExpiresAt)
        ? "expired"
        : current.status;

  await subscriptions.updateOne(
    { _id: existing._id },
    {
      $set: {
        plan: nextPlan,
        status: nextStatus,
        expiresAt: nextExpiresAt,
        updatedAt: nowIso,
      },
    },
  );

  const updated = await subscriptions.findOne({ _id: existing._id });
  const mapped = mapSubscription(updated);

  if (!mapped) {
    return null;
  }

  const userDoc = mapped.userId
    ? await users.findOne(buildIdFilter(mapped.userId))
    : null;
  const resolvedUserDoc = userDoc ?? (await findUserByEmail(mapped.userEmail));

  if (resolvedUserDoc) {
    await users.updateOne(
      { _id: resolvedUserDoc._id },
      {
        $set: {
          plan: isPaidPlan(nextPlan) ? nextPlan : "none",
          updatedAt: nowIso,
        },
      },
    );
  }

  if (isPaidPlan(nextPlan)) {
    await upsertSubscriberRecord(mapped.userEmail, nextPlan, "admin-dashboard", "active");
  } else {
    await removeMembershipRecords(mapped.userEmail, mapped.userId);
  }

  return mapped;
}

export async function listPayments() {
  const { payments } = await getCollections();
  const docs = await payments.find({}).sort({ createdAt: -1 }).toArray();
  return docs
    .map(mapPayment)
    .filter((payment): payment is Payment => payment !== null);
}
