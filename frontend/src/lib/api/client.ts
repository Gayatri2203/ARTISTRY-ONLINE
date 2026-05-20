import { AUTH_COOKIE } from "@/src/lib/constants";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_COOKIE);
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = null;
    }
    const message =
      (data as { message?: string })?.message ??
      `Request failed (${res.status})`;
    throw new ApiError(message, res.status, data);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
