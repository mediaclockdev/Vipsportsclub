import { NextResponse } from "next/server";
import { listSubscribers } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";

export async function GET() {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const subscribers = await listSubscribers();
    return NextResponse.json({ subscribers });
  } catch (error) {
    console.error("LIST SUBSCRIBERS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load subscribers" },
      { status: 500 },
    );
  }
}
