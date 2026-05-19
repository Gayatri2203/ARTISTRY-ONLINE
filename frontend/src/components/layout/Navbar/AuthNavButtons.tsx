"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { memo } from "react";
import PersonIcon from "@mui/icons-material/Person";
import UploadIcon from "@mui/icons-material/Upload";

export type AuthNavButtonsProps = {
  size?: "small" | "large";
  fullWidth?: boolean;
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
  isLoggedIn?: boolean;
  username?: string;
};

function AuthNavButtonsComponent({
  size = "small",
  fullWidth = false,
  orientation = "horizontal",
  onNavigate,
  isLoggedIn = false,
  username = "user",
}: AuthNavButtonsProps) {
  if (isLoggedIn) {
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
          href="/upload"
          startIcon={<UploadIcon />}
          onClick={onNavigate}
        >
          Upload
        </Button>
        <Button
          variant="gradient"
          size={size}
          fullWidth={fullWidth}
          component={Link}
          href={`/profile/${username}`}
          startIcon={<PersonIcon />}
          onClick={onNavigate}
        >
          Profile
        </Button>
      </Stack>
    );
  }

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
