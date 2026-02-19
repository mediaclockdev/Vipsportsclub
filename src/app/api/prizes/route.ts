import { NextResponse } from "next/server";
import { listPrizes } from "@/lib/content-store";

export const runtime = "nodejs";

function parseLimit(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }

  return Math.min(Math.floor(parsed), 100);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = parseLimit(url.searchParams.get("limit"));
    const prizes = await listPrizes({ publishedOnly: true, limit });

    return NextResponse.json(
      { prizes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("PUBLIC PRIZES ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load prizes" },
      { status: 500 },
    );
  }
}
