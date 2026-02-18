import { NextRequest, NextResponse } from "next/server";
import { updateSubscription } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import type {
  MembershipPlan,
  SubscriptionStatus,
  SubscriptionUpdateInput,
} from "@/lib/content-types";

const PLANS: MembershipPlan[] = ["silver", "gold"];
const STATUSES: SubscriptionStatus[] = ["active", "expired"];

function parseSubscriptionUpdate(payload: unknown): {
  data?: SubscriptionUpdateInput;
  error?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;
  const data: SubscriptionUpdateInput = {};

  if ("plan" in raw) {
    if (typeof raw.plan !== "string") {
      return { error: "Plan must be a string" };
    }

    const plan = raw.plan.trim().toLowerCase() as MembershipPlan;
    if (!PLANS.includes(plan)) {
      return { error: "Plan must be either silver or gold" };
    }

    data.plan = plan;
  }

  if ("status" in raw) {
    if (typeof raw.status !== "string") {
      return { error: "Status must be a string" };
    }

    const status = raw.status.trim().toLowerCase() as SubscriptionStatus;
    if (!STATUSES.includes(status)) {
      return { error: "Status must be active or expired" };
    }

    data.status = status;
  }

  if ("expiresAt" in raw) {
    if (typeof raw.expiresAt !== "string") {
      return { error: "Expiry must be a date string" };
    }

    const parsed = new Date(raw.expiresAt);
    if (Number.isNaN(parsed.getTime())) {
      return { error: "Invalid expiry date" };
    }

    data.expiresAt = parsed.toISOString();
  }

  if ("extendDays" in raw) {
    const extendDays = Number(raw.extendDays);
    if (!Number.isFinite(extendDays) || extendDays <= 0) {
      return { error: "extendDays must be a positive number" };
    }
    data.extendDays = Math.round(extendDays);
  }

  if (!Object.keys(data).length) {
    return { error: "No valid fields supplied for update" };
  }

  return { data };
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const { id } = await context.params;
    const payload = await req.json();
    const { data, error } = parseSubscriptionUpdate(payload);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const subscription = await updateSubscription(id, data);

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ subscription });
  } catch (error) {
    console.error("UPDATE SUBSCRIPTION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 },
    );
  }
}
