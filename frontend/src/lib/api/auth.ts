import type { AuthResponse, LoginCredentials, RegisterPayload, User } from "@/src/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    credentials: 'include',
    ...options,
  });

  if (!res.ok) {
    let message = res.statusText;
    try { message = await res.text(); } catch {}
    throw new Error(message || `Request failed: ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as unknown as T);
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    return request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  me: async (): Promise<User> => {
    return request<User>("/api/auth/me", { method: "GET" });
  },

  logout: async (): Promise<void> => {
    await request<void>("/api/auth/logout", { method: "POST" });
  },
};
