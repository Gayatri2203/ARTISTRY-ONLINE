import { v2 as cloudinary } from "cloudinary";

export const CLOUDINARY_FOLDER = "artistry-online" as const;

function getCloudinaryConfig() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local."
    );
  }

  return { cloud_name, api_key, api_secret, secure: true as const };
}

export function ensureCloudinaryConfig() {
  cloudinary.config(getCloudinaryConfig());
}

/** Upload image bytes via Cloudinary upload_stream; returns HTTPS secure_url. */
export async function uploadImageBuffer(buffer: Buffer): Promise<string> {
  ensureCloudinaryConfig();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_FOLDER,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result?.secure_url) {
          reject(new Error("Cloudinary upload did not return secure_url"));
          return;
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}
