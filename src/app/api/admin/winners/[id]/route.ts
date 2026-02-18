import { NextRequest, NextResponse } from "next/server";
import { deleteWinner, updateWinner } from "@/lib/content-store";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import type { WinnerInput } from "@/lib/content-types";

function isValidImageUrl(imageUrl: string) {
  return imageUrl.startsWith("/") || /^https?:\/\//i.test(imageUrl);
}

function parsePartialWinnerInput(payload: unknown): {
  data?: Partial<WinnerInput>;
  error?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { error: "Invalid payload" };
  }

  const raw = payload as Record<string, unknown>;
  const data: Partial<WinnerInput> = {};

  if ("name" in raw) {
    if (typeof raw.name !== "string" || !raw.name.trim()) {
      return { error: "Winner name cannot be empty" };
    }
    data.name = raw.name.trim();
  }

  if ("prize" in raw) {
    if (typeof raw.prize !== "string" || !raw.prize.trim()) {
      return { error: "Winner prize cannot be empty" };
    }
    data.prize = raw.prize.trim();
  }

  if ("location" in raw) {
    if (typeof raw.location !== "string") {
      return { error: "Location must be a string" };
    }
    data.location = raw.location.trim();
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

  if ("announcedAt" in raw) {
    if (typeof raw.announcedAt !== "string") {
      return { error: "Announced date must be a string" };
    }

    const announcedDate = new Date(raw.announcedAt);
    if (Number.isNaN(announcedDate.getTime())) {
      return { error: "Invalid announced date" };
    }

    data.announcedAt = announcedDate.toISOString();
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
    const { data, error } = parsePartialWinnerInput(body);

    if (!data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const winner = await updateWinner(id, data);

    if (!winner) {
      return NextResponse.json({ error: "Winner not found" }, { status: 404 });
    }

    return NextResponse.json({ winner });
  } catch (error) {
    console.error("UPDATE WINNER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update winner" },
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
    const deleted = await deleteWinner(id);

    if (!deleted) {
      return NextResponse.json({ error: "Winner not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE WINNER ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete winner" },
      { status: 500 },
    );
  }
}
