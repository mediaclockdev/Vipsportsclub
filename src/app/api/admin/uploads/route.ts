import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { requireAdminApiAccess } from "@/lib/admin-auth";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const allowedMimeToExtension: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

type UploadDocument = {
  fileName: string;
  extension: string;
  mimeType: string;
  size: number;
  dataBase64: string;
  createdAt: string;
};

const UPLOADS_COLLECTION = "uploads";

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
    const now = new Date().toISOString();

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const db = await getDb();
    const result = await db.collection<UploadDocument>(UPLOADS_COLLECTION).insertOne({
      fileName,
      extension,
      mimeType: file.type,
      size: file.size,
      dataBase64: buffer.toString("base64"),
      createdAt: now,
    });

    return NextResponse.json({
      imageUrl: `/api/uploads/${result.insertedId.toString()}`,
      uploadId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("UPLOAD IMAGE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
