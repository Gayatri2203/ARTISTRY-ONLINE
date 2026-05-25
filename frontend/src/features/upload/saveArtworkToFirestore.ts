import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/src/lib/firebase";

export const ARTWORKS_COLLECTION = "artworks" as const;

export type ArtworkFirestoreInput = {
  title: string;
  description: string;
  category: string;
  price: number | null;
  imageUrl: string;
  artistId?: string;
};

/**
 * Saves artwork metadata to Firestore after Cloudinary upload.
 */
export async function saveArtworkToFirestore(
  input: ArtworkFirestoreInput
): Promise<string> {
  const docRef = await addDoc(collection(db, ARTWORKS_COLLECTION), {
    title: input.title,
    description: input.description,
    category: input.category,
    price: input.price,
    imageUrl: input.imageUrl,
    createdAt: serverTimestamp(),
    ...(input.artistId ? { artistId: input.artistId } : {}),
  });

  return docRef.id;
}
