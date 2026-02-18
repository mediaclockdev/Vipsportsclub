import { NextRequest, NextResponse } from "next/server";
import { updateSubscriber } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import type {
  MembershipPlan,
  SubscriberStatus,
  SubscriberUpdateInput,
} from "@/lib/content-types";

const PLANS: MembershipPlan[] = ["silver", "gold"];
const STATUSES: SubscriberStatus[] = ["active", "unsubscribed"];

function parseSubscriberUpdate(payload: unknown): {
  data?: SubscriberUpdateInput;
  error?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;
  const data: SubscriberUpdateInput = {};

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

    const status = raw.status.trim().toLowerCase() as SubscriberStatus;
    if (!STATUSES.includes(status)) {
      return { error: "Status must be active or unsubscribed" };
    }

    data.status = status;
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
    const { data, error } = parseSubscriberUpdate(payload);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const subscriber = await updateSubscriber(id, data);

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ subscriber });
  } catch (error) {
    console.error("UPDATE SUBSCRIBER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber" },
      { status: 500 },
    );
  }
}
