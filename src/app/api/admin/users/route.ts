import { NextResponse } from "next/server";
import { listUsers } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";

export async function GET() {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const users = await listUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("LIST USERS ERROR:", error);
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}
