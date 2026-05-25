import { NextResponse } from "next/server";

import { uploadImageBuffer } from "@/src/lib/cloudinary";

export const uploadRouteRuntime = "nodejs";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

export async function handleUploadPost(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPG, PNG, GIF, or WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadImageBuffer(buffer);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("[api/upload]", error);
    const message =
      error instanceof Error &&
      error.message.includes("Cloudinary is not configured")
        ? error.message
        : "Image upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
