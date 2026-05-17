"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { memo } from "react";

export type AuthNavButtonsProps = {
  size?: "small" | "large";
  fullWidth?: boolean;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

function AuthNavButtonsComponent({
  size = "small",
  fullWidth = false,
  orientation = "horizontal",
  onNavigate,
}: AuthNavButtonsProps) {
  return (
    <Stack
      direction={orientation === "vertical" ? "column" : "row"}
      spacing={orientation === "vertical" ? 1.5 : 1}
      sx={{ width: fullWidth ? "100%" : "auto" }}
    >
      <Button
        variant="glass"
        size={size}
        fullWidth={fullWidth}
        component={Link}
        href="/login"
        onClick={onNavigate}
      >
        Login
      </Button>
      <Button
        variant="gradient"
        size={size}
        fullWidth={fullWidth}
        component={Link}
        href="/signup"
        onClick={onNavigate}
      >
        Sign up
      </Button>
    </Stack>
  );
}

export const AuthNavButtons = memo(AuthNavButtonsComponent);
