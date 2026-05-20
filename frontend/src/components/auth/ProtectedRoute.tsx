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
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isHydrated, isAuthenticated, router, pathname]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
}
