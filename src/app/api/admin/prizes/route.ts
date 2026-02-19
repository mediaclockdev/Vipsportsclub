import { NextRequest, NextResponse } from "next/server";
import { createPrize, listPrizes } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import type { PrizeInput } from "@/lib/content-types";

function isValidImageUrl(imageUrl: string) {
  return imageUrl.startsWith("/") || /^https?:\/\//i.test(imageUrl);
}

function parsePoints(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function parsePrizeInput(payload: unknown): { data?: PrizeInput; error?: string } {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;
  const drawDateRaw =
    typeof raw.drawDate === "string" ? raw.drawDate.trim() : "";
  const imageUrl = typeof raw.imageUrl === "string" ? raw.imageUrl.trim() : "";
  const imageKey = typeof raw.imageKey === "string" ? raw.imageKey.trim() : "";
  const points = parsePoints(raw.points);
  const isPublished =
    typeof raw.isPublished === "boolean" ? raw.isPublished : true;

  const drawDate = drawDateRaw
    ? new Date(`${drawDateRaw}T00:00:00.000Z`)
    : new Date(NaN);

  if (Number.isNaN(drawDate.getTime())) {
    return { error: "Valid draw date is required" };
  }

  if (points.length === 0) {
    return { error: "At least one point is required" };
  }

  if (!imageUrl && !imageKey) {
    return { error: "Provide image URL/upload or image key" };
  }

  if (imageUrl && !isValidImageUrl(imageUrl)) {
    return {
      error:
        "Image URL must start with / for local images or http(s) for hosted images",
    };
  }

  return {
    data: {
      drawDate: drawDate.toISOString(),
      imageUrl,
      imageKey,
      points,
      isPublished,
    },
  };
}

export async function GET() {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const prizes = await listPrizes();
    return NextResponse.json({ prizes });
  } catch (error) {
    console.error("LIST PRIZES ERROR:", error);
    return NextResponse.json({ error: "Failed to load prizes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const body = await req.json();
    const { data, error } = parsePrizeInput(body);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const prize = await createPrize(data);
    return NextResponse.json({ prize }, { status: 201 });
  } catch (error) {
    console.error("CREATE PRIZE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create prize" },
      { status: 500 },
    );
  }
}
