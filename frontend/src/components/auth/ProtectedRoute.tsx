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


if (isHydrated && !loading && !user) {
  const safePath =
    typeof pathname === "string" && pathname
      ? pathname
      : "/";

  const redirectUrl = `/login?redirect=${encodeURIComponent(
    safePath
  )}`;

  try {
    router.replace(redirectUrl);
  } catch (e) {
    router.replace("/login");
  }
}
}, [isHydrated, loading, user, router, pathname]);

// Prevent hydration mismatch
if (!isHydrated || loading) {
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

// If user not authenticated, show loader while redirecting
if (!user) {
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

    // While redirecting, show a loader to avoid flashing protected content

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