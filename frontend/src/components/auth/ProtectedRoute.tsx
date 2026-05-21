"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuth } from "@/src/context/AuthContext";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const pathname = usePathname();

  const { user, loading } = useAuth();

  useEffect(() => {

    if (!loading && !user) {

      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`
      );

    }

  }, [loading, user, router, pathname]);

  if (loading) {

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}