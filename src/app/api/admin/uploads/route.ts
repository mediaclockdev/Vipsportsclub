import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const allowedMimeToExtension: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

function getUploadDir() {
  return path.join(process.cwd(), "public", "uploads");
}

export async function POST(req: Request) {
  try {
    const unauthorized = await requireAdminApiAccess();
    if (unauthorized) {
      return unauthorized;
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    if (!file.type || !(file.type in allowedMimeToExtension)) {
      return NextResponse.json(
        {
          error:
            "Unsupported file type. Please upload JPG, PNG, WEBP, or AVIF.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Max size is 5MB." },
        { status: 400 },
      );
    }

    const extension = allowedMimeToExtension[file.type];
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const uploadDir = getUploadDir();
    const absolutePath = path.join(uploadDir, fileName);

    await fs.mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await fs.writeFile(absolutePath, Buffer.from(bytes));

    return NextResponse.json({
      imageUrl: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("UPLOAD IMAGE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
