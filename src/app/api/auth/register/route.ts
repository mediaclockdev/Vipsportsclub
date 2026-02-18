import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { upsertUserAccount } from "@/lib/content-store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const runtime = "nodejs";

declare global {
  var _usersEmailIndexPromise: Promise<void> | undefined;
}

function isAdminEmail(email: string) {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email);
}

async function ensureUsersEmailIndex() {
  if (global._usersEmailIndexPromise) {
    return global._usersEmailIndexPromise;
  }

  const runner = (async () => {
    const db = await getDb();
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
  })();

  if (process.env.NODE_ENV !== "production") {
    global._usersEmailIndexPromise = runner;
  }

  await runner;
}

function getSafeErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();

  if (
    lower.includes("mongoserverselectionerror") ||
    lower.includes("tlsv1 alert internal error") ||
    lower.includes("ssl routines") ||
    lower.includes("econnrefused") ||
    lower.includes("etimedout")
  ) {
    return "Database connection failed. Verify Atlas network access, database user credentials, and MONGODB_URI.";
  }

  if (lower.includes("missing mongodb_uri")) {
    return "Server is missing MONGODB_URI environment variable.";
  }

  return "Registration failed";
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
      plan?: "none" | "silver" | "gold";
    };

    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim().toLowerCase();
    const password = String(payload.password ?? "");
    const plan =
      payload.plan === "gold" || payload.plan === "silver"
        ? payload.plan
        : "none";
    const role = isAdminEmail(email) ? "admin" : "user";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const users = db.collection("users");

    await ensureUsersEmailIndex();

    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date().toISOString();

    const result = await users.insertOne({
      name,
      email,
      passwordHash,
      role,
      plan,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    // Keep current admin JSON-based modules in sync until they are fully moved to MongoDB.
    await upsertUserAccount({
      name,
      email,
      plan,
      role,
      source: "auth-register",
    });

    return NextResponse.json({
      success: true,
      userId: String(result.insertedId),
    });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: unknown }).code === 11000
    ) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { error: getSafeErrorMessage(error) },
      { status: 500 },
    );
  }
}
