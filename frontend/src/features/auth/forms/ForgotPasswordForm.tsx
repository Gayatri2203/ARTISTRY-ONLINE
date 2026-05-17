"use client";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import AuthFooterLink from "../components/AuthFooterLink";
import AuthFormHeader from "../components/AuthFormHeader";
import AuthGlassCard from "../components/AuthGlassCard";
import AuthTextField from "../components/AuthTextField";
import SubmitButton from "../components/SubmitButton";
import { zodResolver } from "../lib/zodResolver";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../schemas";

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSentEmail(data.email);
    setEmailSent(true);
    toast.success("Reset link sent to your inbox");
  };

  if (emailSent) {
    return (
      <AuthGlassCard>
        <Stack spacing={2} sx={{ textAlign: "center" }}>
          <MarkEmailReadOutlinedIcon
            sx={{ fontSize: 56, color: "primary.light", mx: "auto" }}
          />
          <AuthFormHeader
            title="Check your email"
            subtitle={`We sent a password reset link to ${sentEmail}. The link expires in 24 hours.`}
          />
          <Button
            variant="gradient"
            size="large"
            fullWidth
            component={Link}
            href="/login"
          >
            Back to sign in
          </Button>
          <Typography variant="body2" color="text.secondary">
            Didn&apos;t receive it?{" "}
            <Typography
              component="button"
              type="button"
              variant="body2"
              onClick={() => setEmailSent(false)}
              sx={{
                color: "primary.light",
                fontWeight: 600,
                border: "none",
                bgcolor: "transparent",
                cursor: "pointer",
                p: 0,
                "&:hover": { color: "secondary.light" },
              }}
            >
              Try again
            </Typography>
          </Typography>
        </Stack>
      </AuthGlassCard>
    );
  }

  return (
    <AuthGlassCard>
      <Button
        component={Link}
        href="/login"
        startIcon={<ArrowBackOutlinedIcon />}
        sx={{
          mb: 2,
          color: "text.secondary",
          alignSelf: "flex-start",
          "&:hover": { color: "text.primary", bgcolor: "rgba(255,255,255,0.04)" },
        }}
      >
        Back to login
      </Button>

      <AuthFormHeader
        title="Reset password"
        subtitle="Enter your email and we'll send you a link to reset your password."
      />

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <AuthTextField
              {...field}
              label="Email"
              type="email"
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              showSuccess={Boolean(touchedFields.email && !errors.email)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon
                        sx={{ fontSize: 20, color: "text.disabled" }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />

        <SubmitButton loading={isSubmitting} loadingText="Sending link…">
          Send reset link
        </SubmitButton>
      </Stack>

      <AuthFooterLink
        text="Remember your password?"
        linkText="Sign in"
        href="/login"
      />
    </AuthGlassCard>
  );
}
