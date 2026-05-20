"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_COOKIE } from "@/src/lib/constants";
import { authApi } from "@/src/lib/api/auth";
import type { LoginCredentials, RegisterPayload, User } from "@/src/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;

  setHydrated: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

function saveToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(AUTH_COOKIE, token);
    document.cookie = `${AUTH_COOKIE}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } else {
    localStorage.removeItem(AUTH_COOKIE);
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,
      error: null,

      setHydrated: () => set({ isHydrated: true }),

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authApi.login(credentials);
          saveToken(token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (e) {
          const message = e instanceof Error ? e.message : "Login failed";
          set({ error: message, isLoading: false });
          throw e;
        }
      },

      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await authApi.register(payload);
          saveToken(token);
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (e) {
          const message = e instanceof Error ? e.message : "Registration failed";
          set({ error: message, isLoading: false });
          throw e;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          saveToken(null);
          set({ user: null, token: null, isAuthenticated: false, error: null });
        }
      },

      fetchUser: async () => {
        const { token } = get();
        if (!token) return;
        set({ isLoading: true });
        try {
          const user = await authApi.me();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          saveToken(null);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "artistry-auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) saveToken(state.token);
        state?.setHydrated();
      },
    }
  )
);
