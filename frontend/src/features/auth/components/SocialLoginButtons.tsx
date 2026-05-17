"use client";

import AppleIcon from "@mui/icons-material/Apple";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { memo } from "react";

import { touchIconButton } from "@/src/theme/responsive";

const SOCIAL_PROVIDERS = [
  { id: "google", label: "Google", icon: <GoogleIcon /> },
  { id: "apple", label: "Apple", icon: <AppleIcon /> },
  { id: "github", label: "GitHub", icon: <GitHubIcon /> },
] as const;

export type SocialLoginButtonsProps = {
  onSocialLogin?: (provider: string) => void;
  disabled?: boolean;
};

function SocialLoginButtonsComponent({
  onSocialLogin,
  disabled = false,
}: SocialLoginButtonsProps) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
      {SOCIAL_PROVIDERS.map((provider) => (
        <Button
          key={provider.id}
          variant="glass"
          fullWidth
          disabled={disabled}
          aria-label={`Continue with ${provider.label}`}
          onClick={() => onSocialLogin?.(provider.id)}
          sx={{
            py: 1.25,
            color: "text.primary",
            "& .MuiButton-startIcon": { mr: 0 },
            ...touchIconButton,
            minHeight: 48,
          }}
        >
          {provider.icon}
        </Button>
      ))}
    </Stack>
  );
}

export const SocialLoginButtons = memo(SocialLoginButtonsComponent);
