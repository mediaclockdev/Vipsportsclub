import { NextResponse } from "next/server";
import { listSubscriptions } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";

export async function GET() {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const subscriptions = await listSubscriptions();
    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error("LIST SUBSCRIPTIONS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load subscriptions" },
      { status: 500 },
    );
  }
}
