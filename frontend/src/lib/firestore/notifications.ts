import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase";

export type NotificationType = "like" | "comment";

export type AppNotification = {
  id: string;
  recipientUserId: string;
  senderUserId: string;
  senderName: string;
  senderAvatar: string;
  type: NotificationType;
  artworkId: string;
  artworkTitle: string;
  createdAt: number | null;
  read: boolean;
};

type CreateNotificationInput = {
  recipientUserId: string;
  senderUserId: string;
  senderName: string;
  senderAvatar?: string;
  type: NotificationType;
  artworkId: string;
  artworkTitle: string;
};

function parseCreatedAt(value: unknown): number | null {
  if (value instanceof Timestamp) {
    return value.toMillis();
  }
  if (
    value &&
    typeof value === "object" &&
    "seconds" in value &&
    typeof (value as { seconds: number }).seconds === "number"
  ) {
    return (value as { seconds: number }).seconds * 1000;
  }
  return null;
}

export async function createNotification(input: CreateNotificationInput): Promise<void> {
  if (!input.recipientUserId || input.recipientUserId === input.senderUserId) return;

  await addDoc(collection(db, "notifications"), {
    recipientUserId: input.recipientUserId,
    senderUserId: input.senderUserId,
    senderName: input.senderName,
    senderAvatar: input.senderAvatar ?? "",
    type: input.type,
    artworkId: input.artworkId,
    artworkTitle: input.artworkTitle,
    createdAt: serverTimestamp(),
    read: false,
  });
}

export async function fetchNotifications(recipientUserId: string): Promise<AppNotification[]> {
  const notificationsQuery = query(
    collection(db, "notifications"),
    where("recipientUserId", "==", recipientUserId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(notificationsQuery);

  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      if (
        typeof data.recipientUserId !== "string" ||
        typeof data.senderUserId !== "string" ||
        typeof data.senderName !== "string" ||
        typeof data.type !== "string" ||
        typeof data.artworkId !== "string" ||
        typeof data.artworkTitle !== "string"
      ) {
        return null;
      }

      return {
        id: docSnap.id,
        recipientUserId: data.recipientUserId,
        senderUserId: data.senderUserId,
        senderName: data.senderName,
        senderAvatar: typeof data.senderAvatar === "string" ? data.senderAvatar : "",
        type: data.type as NotificationType,
        artworkId: data.artworkId,
        artworkTitle: data.artworkTitle,
        createdAt: parseCreatedAt(data.createdAt),
        read: Boolean(data.read),
      } satisfies AppNotification;
    })
    .filter((item): item is AppNotification => item !== null);
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  await updateDoc(doc(db, "notifications", notificationId), { read: true });
}

