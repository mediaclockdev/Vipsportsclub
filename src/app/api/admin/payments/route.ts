import { NextResponse } from "next/server";
import { listPayments } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";

export async function GET() {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const payments = await listPayments();
    return NextResponse.json({ payments });
  } catch (error) {
    console.error("LIST PAYMENTS ERROR:", error);
    return NextResponse.json({ error: "Failed to load payments" }, { status: 500 });
  }
}
