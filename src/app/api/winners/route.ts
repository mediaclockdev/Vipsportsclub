import { NextResponse } from "next/server";
import { listWinners } from "@/lib/content-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const winners = await listWinners({ publishedOnly: true });
    return NextResponse.json(
      { winners },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("PUBLIC WINNERS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load winners" },
      { status: 500 },
    );
  }
}
