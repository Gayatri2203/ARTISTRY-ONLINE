"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuth } from "@/src/context/AuthContext";

function AuthLoading() {
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

export function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || loading || user) return;

    const safePath =
      typeof pathname === "string" && pathname.startsWith("/")
        ? pathname
        : "/";

    router.replace(
      `/login?redirect=${encodeURIComponent(safePath)}`
    );
  }, [isHydrated, loading, user, router, pathname]);

  if (!isHydrated || loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <AuthLoading />;
  }

  return <>{children}</>;
}
