import { apiClient } from "./client";
import type { UpdateProfilePayload, User } from "@/src/types";

export const usersApi = {
  getProfile: (username: string) =>
    apiClient<User & { artworkCount?: number }>(`/users/username/${username}`),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient<User>("/users/me", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
