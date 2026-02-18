import { NextResponse } from "next/server";
import { upsertUserAccount } from "@/lib/content-store";
import type { MembershipPlan } from "@/lib/content-types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLANS: MembershipPlan[] = ["none", "silver", "gold"];

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as {
      name?: string;
      email?: string;
      plan?: string;
    };

    const email = (payload.email ?? "").trim().toLowerCase();
    const normalizedPlan = payload.plan?.trim().toLowerCase() as
      | MembershipPlan
      | undefined;

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (normalizedPlan && !PLANS.includes(normalizedPlan)) {
      return NextResponse.json(
        { error: "Plan must be none, silver, or gold" },
        { status: 400 },
      );
    }

    const user = await upsertUserAccount({
      name: payload.name,
      email,
      plan: normalizedPlan ?? "none",
      source: "auth-form",
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("USER SYNC ERROR:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
