import { NextRequest, NextResponse } from "next/server";
import { updateUser } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import type {
  MembershipPlan,
  UserRole,
  UserStatus,
  UserUpdateInput,
} from "@/lib/content-types";

const PLANS: MembershipPlan[] = ["none", "silver", "gold"];
const STATUSES: UserStatus[] = ["active", "blocked"];
const ROLES: UserRole[] = ["user", "admin"];

function parseUserUpdate(payload: unknown): {
  data?: UserUpdateInput;
  error?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;
  const data: UserUpdateInput = {};

  if ("name" in raw) {
    if (typeof raw.name !== "string") {
      return { error: "Name must be a string" };
    }
    data.name = raw.name;
  }

  if ("plan" in raw) {
    if (typeof raw.plan !== "string") {
      return { error: "Plan must be a string" };
    }

    const plan = raw.plan.trim().toLowerCase() as MembershipPlan;
    if (!PLANS.includes(plan)) {
      return { error: "Plan must be none, silver, or gold" };
    }

    data.plan = plan;
  }

  if ("status" in raw) {
    if (typeof raw.status !== "string") {
      return { error: "Status must be a string" };
    }

    const status = raw.status.trim().toLowerCase() as UserStatus;
    if (!STATUSES.includes(status)) {
      return { error: "Status must be active or blocked" };
    }

    data.status = status;
  }

  if ("role" in raw) {
    if (typeof raw.role !== "string") {
      return { error: "Role must be a string" };
    }

    const role = raw.role.trim().toLowerCase() as UserRole;
    if (!ROLES.includes(role)) {
      return { error: "Role must be user or admin" };
    }

    data.role = role;
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
    const { data, error } = parseUserUpdate(payload);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const user = await updateUser(id, data);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
