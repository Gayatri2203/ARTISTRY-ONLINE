import { handleUploadPost } from "@/src/lib/api/upload-route";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleUploadPost(request);
}
