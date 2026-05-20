import { apiClient } from "./client";
import type { Artwork, DashboardStats } from "@/src/types";

export const artworksApi = {
  list: (params?: { category?: string; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.search) q.set("search", params.search);
    const query = q.toString();
    return apiClient<Artwork[]>(`/artworks${query ? `?${query}` : ""}`);
  },

  trending: () => apiClient<Artwork[]>("/artworks/trending"),

  byId: (id: string) => apiClient<Artwork>(`/artworks/${id}`),

  similar: (id: string) => apiClient<Artwork[]>(`/artworks/${id}/similar`),

  byUser: (userId: string) =>
    apiClient<Artwork[]>(`/users/${userId}/artworks`),

  upload: (formData: FormData) =>
    apiClient<Artwork>("/artworks", { method: "POST", body: formData }),

  like: (id: string) =>
    apiClient<{ likes: number }>(`/artworks/${id}/like`, { method: "POST" }),

  dashboardStats: () => apiClient<DashboardStats>("/artworks/dashboard/stats"),
};
