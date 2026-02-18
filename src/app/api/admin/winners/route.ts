import { NextRequest, NextResponse } from "next/server";
import { createWinner, listWinners } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import type { WinnerInput } from "@/lib/content-types";

function isValidImageUrl(imageUrl: string) {
  return imageUrl.startsWith("/") || /^https?:\/\//i.test(imageUrl);
}

function parseWinnerInput(payload: unknown): {
  data?: WinnerInput;
  error?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const prize = typeof raw.prize === "string" ? raw.prize.trim() : "";
  const location = typeof raw.location === "string" ? raw.location.trim() : "";
  const imageUrl = typeof raw.imageUrl === "string" ? raw.imageUrl.trim() : "";
  const isPublished =
    typeof raw.isPublished === "boolean" ? raw.isPublished : true;

  if (!name) {
    return { error: "Winner name is required" };
  }

  if (!prize) {
    return { error: "Winner prize is required" };
  }

  if (imageUrl && !isValidImageUrl(imageUrl)) {
    return {
      error:
        "Image URL must start with / for local images or http(s) for hosted images",
    };
  }

  const announcedDate =
    typeof raw.announcedAt === "string" && raw.announcedAt.trim()
      ? new Date(raw.announcedAt)
      : new Date();

  if (Number.isNaN(announcedDate.getTime())) {
    return { error: "Invalid announced date" };
  }

  return {
    data: {
      name,
      prize,
      location,
      imageUrl,
      isPublished,
      announcedAt: announcedDate.toISOString(),
    },
  };
}

export async function GET() {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const winners = await listWinners();
    return NextResponse.json({ winners });
  } catch (error) {
    console.error("LIST WINNERS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load winners" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const body = await req.json();
    const { data, error } = parseWinnerInput(body);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const winner = await createWinner(data);
    return NextResponse.json({ winner }, { status: 201 });
  } catch (error) {
    console.error("CREATE WINNER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create winner" },
      { status: 500 },
    );
  }
}
