"use client";

import { useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuthStore } from "@/src/store/authStore";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { isHydrated, fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (isHydrated && token) {
      fetchUser();
    }
  }, [isHydrated, token, fetchUser]);

  if (!isHydrated) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <>{children}</>;
}
