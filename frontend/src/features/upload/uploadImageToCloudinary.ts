type UploadSuccessResponse = {
  imageUrl: string;
};

type UploadErrorResponse = {
  error: string;
};

async function parseUploadResponse(
  response: Response
): Promise<UploadSuccessResponse | UploadErrorResponse> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    throw new Error(
      text.startsWith("Server act") || text.includes("Server Action")
        ? "Upload API route not found. Use POST /api/upload (App Router route), not Server Actions."
        : `Upload API returned non-JSON response (${response.status})`
    );
  }

  try {
    return (await response.json()) as UploadSuccessResponse | UploadErrorResponse;
  } catch {
    throw new Error("Upload API returned invalid JSON");
  }
}

/**
 * Sends an image file to the App Router /api/upload route (Cloudinary).
 */
export async function uploadImageToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await parseUploadResponse(response);

  if (!response.ok) {
    const message =
      "error" in data && typeof data.error === "string"
        ? data.error
        : "Image upload failed";
    throw new Error(message);
  }

  if (!("imageUrl" in data) || typeof data.imageUrl !== "string") {
    throw new Error("Upload API did not return imageUrl");
  }

  return data.imageUrl;
}
