import { NextResponse } from "next/server";
import { listWinners } from "@/lib/content-store";

export async function GET() {
  try {
    const winners = await listWinners({ publishedOnly: true });
    return NextResponse.json({ winners });
  } catch (error) {
    console.error("PUBLIC WINNERS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load winners" },
      { status: 500 },
    );
  }
}
