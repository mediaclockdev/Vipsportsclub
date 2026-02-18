import { Binary, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type UploadDocument = {
  _id: ObjectId;
  fileName?: string;
  mimeType?: string;
  dataBase64?: string;
  data?: Binary | Buffer | Uint8Array | null;
};

const UPLOADS_COLLECTION = "uploads";

function toBuffer(upload: UploadDocument) {
  if (typeof upload.dataBase64 === "string" && upload.dataBase64) {
    return Buffer.from(upload.dataBase64, "base64");
  }

  if (Buffer.isBuffer(upload.data)) {
    return upload.data;
  }

  if (upload.data instanceof Binary) {
    return Buffer.from(upload.data.buffer);
  }

  if (upload.data instanceof Uint8Array) {
    return Buffer.from(upload.data);
  }

  return null;
}

export async function GET(_: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    const db = await getDb();
    const upload = await db
      .collection<UploadDocument>(UPLOADS_COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!upload) {
      return NextResponse.json({ error: "Upload not found" }, { status: 404 });
    }

    const body = toBuffer(upload);
    if (!body) {
      return NextResponse.json({ error: "Upload data missing" }, { status: 500 });
    }

    const responseBody = new Uint8Array(body);

    return new Response(responseBody, {
      headers: {
        "Content-Type": upload.mimeType || "application/octet-stream",
        "Content-Length": body.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": `inline; filename="${upload.fileName || `${id}.bin`}"`,
      },
    });
  } catch (error) {
    console.error("GET UPLOAD ERROR:", error);
    return NextResponse.json({ error: "Failed to load upload" }, { status: 500 });
  }
}
