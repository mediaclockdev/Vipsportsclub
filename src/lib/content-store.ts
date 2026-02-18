import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type {
  AdminContentStore,
  AdminUser,
  MembershipPlan,
  Payment,
  PaymentStatus,
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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "admin-content.json");

const INITIAL_STORE: AdminContentStore = {
  winners: [],
  subscribers: [],
  users: [],
  subscriptions: [],
  payments: [],
};

type PaidMembershipPlan = Exclude<MembershipPlan, "none">;

const MEMBERSHIP_PLANS: MembershipPlan[] = ["none", "silver", "gold"];
const PAID_MEMBERSHIP_PLANS: PaidMembershipPlan[] = ["silver", "gold"];
const SUBSCRIBER_STATUSES: SubscriberStatus[] = ["active", "unsubscribed"];
const USER_STATUSES: UserStatus[] = ["active", "blocked"];
const USER_ROLES: UserRole[] = ["user", "admin"];
const SUBSCRIPTION_STATUSES: SubscriptionStatus[] = ["active", "expired"];
const PAYMENT_STATUSES: PaymentStatus[] = ["success", "failed", "pending"];
const DEFAULT_SUBSCRIPTION_DAYS = 30;

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

function normalizeSubscriber(raw: unknown): Subscriber | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const record = raw as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";

  if (!email) {
    return null;
  }

  const source =
    typeof record.source === "string" && record.source.trim()
      ? record.source.trim()
      : "website";

  return {
    id: typeof record.id === "string" && record.id.trim() ? record.id : randomUUID(),
    email,
    plan: normalizeMembershipPlan(record.plan, "silver"),
    source,
    status: normalizeSubscriberStatus(record.status),
    createdAt: normalizeIsoDate(record.createdAt),
  };
}

function normalizeUser(raw: unknown): AdminUser | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const record = raw as Record<string, unknown>;
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";

  if (!email) {
    return null;
  }

  const now = new Date().toISOString();
  const joinedAt = normalizeIsoDate(record.joinedAt, now);

  return {
    id: typeof record.id === "string" && record.id.trim() ? record.id : randomUUID(),
    name: normalizeName(record.name, email),
    email,
    plan: normalizeMembershipPlan(record.plan, "none"),
    status: normalizeUserStatus(record.status),
    role: normalizeUserRole(record.role),
    joinedAt,
    updatedAt: normalizeIsoDate(record.updatedAt, joinedAt),
  };
}

function normalizeSubscription(raw: unknown): Subscription | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const record = raw as Record<string, unknown>;
  const userId = typeof record.userId === "string" ? record.userId.trim() : "";
  const userEmail =
    typeof record.userEmail === "string" ? record.userEmail.trim().toLowerCase() : "";

  if (!userId || !userEmail) {
    return null;
  }

  const createdAt = normalizeIsoDate(record.createdAt);
  const expiresAt = normalizeIsoDate(record.expiresAt, addDays(createdAt, DEFAULT_SUBSCRIPTION_DAYS));

  return {
    id: typeof record.id === "string" && record.id.trim() ? record.id : randomUUID(),
    userId,
    userName: normalizeName(record.userName, userEmail),
    userEmail,
    plan: normalizeMembershipPlan(record.plan, "silver"),
    status: normalizeSubscriptionStatus(record.status, expiresAt),
    expiresAt,
    createdAt,
    updatedAt: normalizeIsoDate(record.updatedAt, createdAt),
  };
}

function normalizePayment(raw: unknown): Payment | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const record = raw as Record<string, unknown>;
  const userId = typeof record.userId === "string" ? record.userId.trim() : "";
  const userEmail =
    typeof record.userEmail === "string" ? record.userEmail.trim().toLowerCase() : "";

  if (!userId || !userEmail) {
    return null;
  }

  const amount = typeof record.amount === "number" ? record.amount : Number(record.amount);

  return {
    id: typeof record.id === "string" && record.id.trim() ? record.id : randomUUID(),
    userId,
    userName: normalizeName(record.userName, userEmail),
    userEmail,
    amount: Number.isFinite(amount) ? amount : 0,
    plan: normalizeMembershipPlan(record.plan, "silver"),
    paymentId:
      typeof record.paymentId === "string" && record.paymentId.trim()
        ? record.paymentId.trim()
        : `manual_${randomUUID().slice(0, 8)}`,
    status: normalizePaymentStatus(record.status),
    createdAt: normalizeIsoDate(record.createdAt),
  };
}

function getNextExpiryFromNow() {
  return addDays(new Date().toISOString(), DEFAULT_SUBSCRIPTION_DAYS);
}

function ensureUserInStore(
  store: AdminContentStore,
  email: string,
  plan: MembershipPlan,
  options?: { name?: string; role?: UserRole },
): { user: AdminUser; changed: boolean } {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = store.users.find((user) => user.email === normalizedEmail);
  const now = new Date().toISOString();

  if (existingUser) {
    const nextUser: AdminUser = {
      ...existingUser,
      name: options?.name?.trim() ? options.name.trim() : existingUser.name,
      plan,
      role: options?.role ?? existingUser.role,
      updatedAt: now,
    };

    const changed =
      nextUser.name !== existingUser.name ||
      nextUser.plan !== existingUser.plan ||
      nextUser.role !== existingUser.role;

    if (changed) {
      store.users = store.users.map((user) =>
        user.id === existingUser.id ? nextUser : user,
      );
      return { user: nextUser, changed: true };
    }

    return { user: existingUser, changed: false };
  }

  const newUser: AdminUser = {
    id: randomUUID(),
    name: normalizeName(options?.name, normalizedEmail),
    email: normalizedEmail,
    plan,
    status: "active",
    role: options?.role ?? "user",
    joinedAt: now,
    updatedAt: now,
  };

  store.users.unshift(newUser);
  return { user: newUser, changed: true };
}

function ensureSubscriptionInStore(
  store: AdminContentStore,
  user: AdminUser,
  plan: MembershipPlan,
): { changed: boolean } {
  if (!isPaidPlan(plan)) {
    const nextSubscriptions = store.subscriptions.filter(
      (subscription) =>
        subscription.userId !== user.id && subscription.userEmail !== user.email,
    );

    if (nextSubscriptions.length !== store.subscriptions.length) {
      store.subscriptions = nextSubscriptions;
      return { changed: true };
    }

    return { changed: false };
  }

  const existingSubscription = store.subscriptions.find(
    (subscription) => subscription.userId === user.id,
  );

  const now = new Date().toISOString();

  if (existingSubscription) {
    const nextExpiresAt =
      existingSubscription.status === "expired" || isExpired(existingSubscription.expiresAt)
        ? getNextExpiryFromNow()
        : existingSubscription.expiresAt;

    const nextSubscription: Subscription = {
      ...existingSubscription,
      userName: user.name,
      userEmail: user.email,
      plan,
      status: isExpired(nextExpiresAt) ? "expired" : "active",
      expiresAt: nextExpiresAt,
      updatedAt: now,
    };

    const changed =
      nextSubscription.userName !== existingSubscription.userName ||
      nextSubscription.plan !== existingSubscription.plan ||
      nextSubscription.status !== existingSubscription.status ||
      nextSubscription.expiresAt !== existingSubscription.expiresAt;

    if (changed) {
      store.subscriptions = store.subscriptions.map((subscription) =>
        subscription.id === existingSubscription.id ? nextSubscription : subscription,
      );
      return { changed: true };
    }

    return { changed: false };
  }

  const newSubscription: Subscription = {
    id: randomUUID(),
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    plan,
    status: "active",
    expiresAt: getNextExpiryFromNow(),
    createdAt: now,
    updatedAt: now,
  };

  store.subscriptions.unshift(newSubscription);
  return { changed: true };
}

function syncStoreRelations(store: AdminContentStore) {
  let changed = false;

  const paidPaymentEmails = new Set(
    store.payments
      .filter((payment) => payment.status === "success" && isPaidPlan(payment.plan))
      .map((payment) => payment.userEmail),
  );

  const paidSubscribers = store.subscribers.filter((subscriber) =>
    isPaidPlan(subscriber.plan) &&
    !(
      (subscriber.source === "auth-register" || subscriber.source === "auth-form") &&
      !paidPaymentEmails.has(subscriber.email)
    ),
  );
  if (paidSubscribers.length !== store.subscribers.length) {
    store.subscribers = paidSubscribers;
    changed = true;
  }

  for (const subscriber of store.subscribers) {
    const userResult = ensureUserInStore(store, subscriber.email, subscriber.plan);
    if (userResult.changed) {
      changed = true;
    }

    const subscriptionResult = ensureSubscriptionInStore(
      store,
      userResult.user,
      subscriber.plan,
    );
    if (subscriptionResult.changed) {
      changed = true;
    }
  }

  for (const user of store.users) {
    const subscriber = store.subscribers.find((item) => item.email === user.email);

    if (!subscriber) {
      if (user.plan !== "none") {
        user.plan = "none";
        user.updatedAt = new Date().toISOString();
        changed = true;
      }

      const subscriptionResult = ensureSubscriptionInStore(store, user, "none");
      if (subscriptionResult.changed) {
        changed = true;
      }
      continue;
    }

    const nextPlan = subscriber.plan;
    if (user.plan !== nextPlan) {
      user.plan = nextPlan;
      user.updatedAt = new Date().toISOString();
      changed = true;
    }

    const subscriptionResult = ensureSubscriptionInStore(store, user, nextPlan);
    if (subscriptionResult.changed) {
      changed = true;
    }
  }

  store.subscriptions = store.subscriptions.map((subscription) => {
    const normalizedExpiresAt = normalizeIsoDate(
      subscription.expiresAt,
      getNextExpiryFromNow(),
    );
    const normalizedStatus = isExpired(normalizedExpiresAt)
      ? "expired"
      : subscription.status;

    if (
      normalizedExpiresAt !== subscription.expiresAt ||
      normalizedStatus !== subscription.status
    ) {
      changed = true;
      return {
        ...subscription,
        expiresAt: normalizedExpiresAt,
        status: normalizedStatus,
        updatedAt: new Date().toISOString(),
      };
    }

    return subscription;
  });

  return changed;
}

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(INITIAL_STORE, null, 2), "utf-8");
  }
}

async function readStore(): Promise<AdminContentStore> {
  await ensureStoreFile();

  const raw = await fs.readFile(DATA_FILE, "utf-8");

  try {
    const parsed = JSON.parse(raw) as Partial<AdminContentStore>;

    const store: AdminContentStore = {
      winners: Array.isArray(parsed.winners) ? parsed.winners : [],
      subscribers: Array.isArray(parsed.subscribers)
        ? parsed.subscribers
            .map((subscriber) => normalizeSubscriber(subscriber))
            .filter((subscriber): subscriber is Subscriber => subscriber !== null)
        : [],
      users: Array.isArray(parsed.users)
        ? parsed.users
            .map((user) => normalizeUser(user))
            .filter((user): user is AdminUser => user !== null)
        : [],
      subscriptions: Array.isArray(parsed.subscriptions)
        ? parsed.subscriptions
            .map((subscription) => normalizeSubscription(subscription))
            .filter((subscription): subscription is Subscription => subscription !== null)
        : [],
      payments: Array.isArray(parsed.payments)
        ? parsed.payments
            .map((payment) => normalizePayment(payment))
            .filter((payment): payment is Payment => payment !== null)
        : [],
    };

    const changed = syncStoreRelations(store);
    if (changed) {
      await writeStore(store);
    }

    return store;
  } catch {
    await writeStore(INITIAL_STORE);
    return INITIAL_STORE;
  }
}

async function writeStore(store: AdminContentStore) {
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export async function listWinners(options?: { publishedOnly?: boolean }) {
  const store = await readStore();
  const winners = options?.publishedOnly
    ? store.winners.filter((winner) => winner.isPublished)
    : store.winners;

  return [...winners].sort((a, b) => b.announcedAt.localeCompare(a.announcedAt));
}

export async function createWinner(input: WinnerInput): Promise<Winner> {
  const store = await readStore();
  const now = new Date().toISOString();

  const winner: Winner = {
    id: randomUUID(),
    name: input.name.trim(),
    prize: input.prize.trim(),
    location: input.location?.trim() ?? "",
    imageUrl: input.imageUrl?.trim() ?? "",
    announcedAt: input.announcedAt ?? now,
    isPublished: input.isPublished ?? true,
    createdAt: now,
    updatedAt: now,
  };

  store.winners.unshift(winner);
  await writeStore(store);

  return winner;
}

export async function updateWinner(
  id: string,
  input: Partial<WinnerInput>,
): Promise<Winner | null> {
  const store = await readStore();
  const winnerIndex = store.winners.findIndex((winner) => winner.id === id);

  if (winnerIndex < 0) {
    return null;
  }

  const currentWinner = store.winners[winnerIndex];

  const updatedWinner: Winner = {
    ...currentWinner,
    name: input.name !== undefined ? input.name.trim() : currentWinner.name,
    prize: input.prize !== undefined ? input.prize.trim() : currentWinner.prize,
    location: input.location !== undefined ? input.location.trim() : currentWinner.location,
    imageUrl: input.imageUrl !== undefined ? input.imageUrl.trim() : currentWinner.imageUrl,
    announcedAt: input.announcedAt !== undefined ? input.announcedAt : currentWinner.announcedAt,
    isPublished: input.isPublished !== undefined ? input.isPublished : currentWinner.isPublished,
    updatedAt: new Date().toISOString(),
  };

  store.winners[winnerIndex] = updatedWinner;
  await writeStore(store);

  return updatedWinner;
}

export async function deleteWinner(id: string) {
  const store = await readStore();
  const nextWinners = store.winners.filter((winner) => winner.id !== id);

  if (nextWinners.length === store.winners.length) {
    return false;
  }

  store.winners = nextWinners;
  await writeStore(store);

  return true;
}

export async function listSubscribers() {
  const store = await readStore();
  return [...store.subscribers].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function upsertSubscriber(
  email: string,
  source = "website",
  plan: MembershipPlan = "silver",
) {
  const store = await readStore();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedSource = source.trim() || "website";
  const normalizedPlan = normalizeMembershipPlan(plan, "silver");

  const existingSubscriber = store.subscribers.find(
    (subscriber) => subscriber.email === normalizedEmail,
  );

  let subscriber: Subscriber;

  if (existingSubscriber) {
    subscriber = {
      ...existingSubscriber,
      source: normalizedSource,
      plan: normalizedPlan,
      status: "active",
    };

    store.subscribers = store.subscribers.map((item) =>
      item.id === existingSubscriber.id ? subscriber : item,
    );
  } else {
    subscriber = {
      id: randomUUID(),
      email: normalizedEmail,
      source: normalizedSource,
      plan: normalizedPlan,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    store.subscribers.unshift(subscriber);
  }

  const userResult = ensureUserInStore(store, normalizedEmail, normalizedPlan);
  const subscriptionResult = ensureSubscriptionInStore(
    store,
    userResult.user,
    normalizedPlan,
  );

  if (userResult.changed || subscriptionResult.changed || !existingSubscriber) {
    await writeStore(store);
    return subscriber;
  }

  const hasSubscriberChanges =
    !existingSubscriber ||
    existingSubscriber.source !== subscriber.source ||
    existingSubscriber.plan !== subscriber.plan ||
    existingSubscriber.status !== subscriber.status;

  if (hasSubscriberChanges) {
    await writeStore(store);
  }

  return subscriber;
}

export async function updateSubscriber(
  id: string,
  input: SubscriberUpdateInput,
): Promise<Subscriber | null> {
  const store = await readStore();
  const subscriberIndex = store.subscribers.findIndex(
    (subscriber) => subscriber.id === id,
  );

  if (subscriberIndex < 0) {
    return null;
  }

  const currentSubscriber = store.subscribers[subscriberIndex];

  const nextSubscriber: Subscriber = {
    ...currentSubscriber,
    plan:
      input.plan !== undefined
        ? normalizeMembershipPlan(input.plan, currentSubscriber.plan)
        : currentSubscriber.plan,
    status:
      input.status !== undefined
        ? normalizeSubscriberStatus(input.status)
        : currentSubscriber.status,
  };

  store.subscribers[subscriberIndex] = nextSubscriber;

  const linkedUser = store.users.find((user) => user.email === nextSubscriber.email);
  if (linkedUser) {
    linkedUser.plan = nextSubscriber.plan;
    linkedUser.updatedAt = new Date().toISOString();
  }

  const linkedSubscription = store.subscriptions.find(
    (subscription) => subscription.userEmail === nextSubscriber.email,
  );
  if (linkedSubscription) {
    linkedSubscription.plan = nextSubscriber.plan;
    linkedSubscription.updatedAt = new Date().toISOString();
  }

  await writeStore(store);

  return nextSubscriber;
}

export async function upsertUserAccount(input: {
  name?: string;
  email: string;
  plan?: MembershipPlan;
  role?: UserRole;
  source?: string;
}) {
  const store = await readStore();
  const normalizedEmail = input.email.trim().toLowerCase();
  const normalizedPlan = normalizeMembershipPlan(input.plan, "none");
  const now = new Date().toISOString();

  const userResult = ensureUserInStore(store, normalizedEmail, normalizedPlan, {
    name: input.name,
    role: input.role ? normalizeUserRole(input.role) : undefined,
  });

  let changed = userResult.changed;
  const subscriberIndex = store.subscribers.findIndex(
    (item) => item.email === normalizedEmail,
  );

  if (isPaidPlan(normalizedPlan)) {
    if (subscriberIndex >= 0) {
      const existingSubscriber = store.subscribers[subscriberIndex];
      const nextSource = input.source?.trim() || existingSubscriber.source;
      const nextSubscriber: Subscriber = {
        ...existingSubscriber,
        plan: normalizedPlan,
        source: nextSource,
        status: "active",
      };

      if (
        nextSubscriber.plan !== existingSubscriber.plan ||
        nextSubscriber.status !== existingSubscriber.status ||
        nextSubscriber.source !== existingSubscriber.source
      ) {
        store.subscribers[subscriberIndex] = nextSubscriber;
        changed = true;
      }
    } else {
      store.subscribers.unshift({
        id: randomUUID(),
        email: normalizedEmail,
        plan: normalizedPlan,
        source: input.source?.trim() || "auth-form",
        status: "active",
        createdAt: now,
      });
      changed = true;
    }
  } else if (subscriberIndex >= 0) {
    store.subscribers.splice(subscriberIndex, 1);
    changed = true;
  }

  const subscriptionResult = ensureSubscriptionInStore(
    store,
    userResult.user,
    normalizedPlan,
  );

  if (subscriptionResult.changed) {
    changed = true;
  }

  if (changed) {
    await writeStore(store);
    return userResult.user;
  }

  return userResult.user;
}

export async function listUsers() {
  const store = await readStore();
  return [...store.users].sort((a, b) => b.joinedAt.localeCompare(a.joinedAt));
}

export async function updateUser(
  id: string,
  input: UserUpdateInput,
): Promise<AdminUser | null> {
  const store = await readStore();
  const userIndex = store.users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return null;
  }

  const currentUser = store.users[userIndex];
  const nextUser: AdminUser = {
    ...currentUser,
    name: input.name !== undefined ? normalizeName(input.name, currentUser.email) : currentUser.name,
    plan:
      input.plan !== undefined
        ? normalizeMembershipPlan(input.plan, currentUser.plan)
        : currentUser.plan,
    status:
      input.status !== undefined ? normalizeUserStatus(input.status) : currentUser.status,
    role: input.role !== undefined ? normalizeUserRole(input.role) : currentUser.role,
    updatedAt: new Date().toISOString(),
  };

  store.users[userIndex] = nextUser;

  if (isPaidPlan(nextUser.plan)) {
    const linkedSubscriber = store.subscribers.find(
      (subscriber) => subscriber.email === nextUser.email,
    );
    if (linkedSubscriber) {
      linkedSubscriber.plan = nextUser.plan;
    }
  } else {
    store.subscribers = store.subscribers.filter(
      (subscriber) => subscriber.email !== nextUser.email,
    );
  }

  if (isPaidPlan(nextUser.plan)) {
    const linkedSubscription = store.subscriptions.find(
      (subscription) => subscription.userId === nextUser.id,
    );
    if (linkedSubscription) {
      linkedSubscription.userName = nextUser.name;
      linkedSubscription.userEmail = nextUser.email;
      linkedSubscription.plan = nextUser.plan;
      linkedSubscription.updatedAt = new Date().toISOString();
    }
  } else {
    store.subscriptions = store.subscriptions.filter(
      (subscription) =>
        subscription.userId !== nextUser.id &&
        subscription.userEmail !== nextUser.email,
    );
  }

  await writeStore(store);

  return nextUser;
}

export async function listSubscriptions() {
  const store = await readStore();
  return [...store.subscriptions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function updateSubscription(
  id: string,
  input: SubscriptionUpdateInput,
): Promise<Subscription | null> {
  const store = await readStore();
  const subscriptionIndex = store.subscriptions.findIndex(
    (subscription) => subscription.id === id,
  );

  if (subscriptionIndex < 0) {
    return null;
  }

  const currentSubscription = store.subscriptions[subscriptionIndex];
  const nowIso = new Date().toISOString();

  let nextExpiresAt =
    input.expiresAt !== undefined
      ? normalizeIsoDate(input.expiresAt, currentSubscription.expiresAt)
      : currentSubscription.expiresAt;

  if (typeof input.extendDays === "number" && Number.isFinite(input.extendDays) && input.extendDays > 0) {
    const base = isExpired(nextExpiresAt) ? nowIso : nextExpiresAt;
    nextExpiresAt = addDays(base, Math.round(input.extendDays));
  }

  const nextStatus =
    input.status !== undefined
      ? normalizeSubscriptionStatus(input.status, nextExpiresAt)
      : isExpired(nextExpiresAt)
        ? "expired"
        : currentSubscription.status;

  const nextSubscription: Subscription = {
    ...currentSubscription,
    plan:
      input.plan !== undefined
        ? normalizeMembershipPlan(input.plan, currentSubscription.plan)
        : currentSubscription.plan,
    status: nextStatus,
    expiresAt: nextExpiresAt,
    updatedAt: nowIso,
  };

  store.subscriptions[subscriptionIndex] = nextSubscription;

  const linkedUser = store.users.find((user) => user.id === nextSubscription.userId);
  if (linkedUser) {
    linkedUser.plan = nextSubscription.plan;
    linkedUser.updatedAt = nowIso;
  }

  const linkedSubscriber = store.subscribers.find(
    (subscriber) => subscriber.email === nextSubscription.userEmail,
  );
  if (linkedSubscriber) {
    linkedSubscriber.plan = nextSubscription.plan;
  }

  await writeStore(store);

  return nextSubscription;
}

export async function listPayments() {
  const store = await readStore();
  return [...store.payments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
