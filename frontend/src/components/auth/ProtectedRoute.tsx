"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthStore } from "@/src/store/authStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      const safePath = typeof pathname === "string" && pathname ? pathname : "/";
      const redirectUrl = `/login?redirect=${encodeURIComponent(safePath)}`;
      try {
        router.replace(redirectUrl);
      } catch (e) {
        // If replace fails for any reason, navigate to login without redirect
        try {
          router.replace("/login");
        } catch {}
      }
    }
  }, [isHydrated, isAuthenticated, router, pathname]);

  if (!isHydrated) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // While redirecting, show a loader to avoid flashing protected content
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
}
