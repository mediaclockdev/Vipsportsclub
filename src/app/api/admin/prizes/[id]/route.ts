import { NextRequest, NextResponse } from "next/server";
import { deletePrize, updatePrize } from "@/lib/content-store";
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

function parsePartialPrizeInput(payload: unknown): {
  data?: Partial<PrizeInput>;
  error?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;
  const data: Partial<PrizeInput> = {};

  if ("drawDate" in raw) {
    if (typeof raw.drawDate !== "string" || !raw.drawDate.trim()) {
      return { error: "Draw date cannot be empty" };
    }

    const drawDate = new Date(`${raw.drawDate.trim()}T00:00:00.000Z`);
    if (Number.isNaN(drawDate.getTime())) {
      return { error: "Draw date must be valid" };
    }

    data.drawDate = drawDate.toISOString();
  }

  if ("imageUrl" in raw) {
    if (typeof raw.imageUrl !== "string") {
      return { error: "Image URL must be a string" };
    }

    const imageUrl = raw.imageUrl.trim();
    if (imageUrl && !isValidImageUrl(imageUrl)) {
      return {
        error:
          "Image URL must start with / for local images or http(s) for hosted images",
      };
    }
    data.imageUrl = imageUrl;
  }

  if ("imageKey" in raw) {
    if (typeof raw.imageKey !== "string") {
      return { error: "Image key must be a string" };
    }
    data.imageKey = raw.imageKey.trim();
  }

  if ("points" in raw) {
    const points = parsePoints(raw.points);
    if (points.length === 0) {
      return { error: "At least one point is required" };
    }
    data.points = points;
  }

  if ("isPublished" in raw) {
    if (typeof raw.isPublished !== "boolean") {
      return { error: "isPublished must be a boolean" };
    }
    data.isPublished = raw.isPublished;
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
    const body = await req.json();
    const { data, error } = parsePartialPrizeInput(body);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const prize = await updatePrize(id, data);
    if (!prize) {
      return NextResponse.json({ error: "Prize not found" }, { status: 404 });
    }

    return NextResponse.json({ prize });
  } catch (error) {
    console.error("UPDATE PRIZE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update prize" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: NextRequest, context: RouteContext) {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const { id } = await context.params;
    const deleted = await deletePrize(id);

    if (!deleted) {
      return NextResponse.json({ error: "Prize not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE PRIZE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete prize" },
      { status: 500 },
    );
  }
}
