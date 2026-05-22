"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/src/lib/firebase";

import AuthDivider from "../components/AuthDivider";
import AuthFooterLink from "../components/AuthFooterLink";
import AuthFormHeader from "../components/AuthFormHeader";
import AuthGlassCard from "../components/AuthGlassCard";
import AuthTextField from "../components/AuthTextField";
import PasswordField from "../components/PasswordField";
import { SocialLoginButtons } from "../components/SocialLoginButtons";
import SubmitButton from "../components/SubmitButton";
import { zodResolver } from "../lib/zodResolver";
import { useAuth } from "@/src/context/AuthContext";
import { ROUTES } from "@/src/lib/constants";


import { loginSchema, type LoginFormValues } from "../schemas";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get("redirect") ?? "";

  const redirect =
  rawRedirect && rawRedirect.startsWith("/")
    ? rawRedirect
    : ROUTES.dashboard; 

  const { user, loading: authLoading } = useAuth();
  const [socialLoading, setSocialLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(redirect);
    }
  }, [authLoading, user, router, redirect]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {

  
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
  
      toast.success(
        `Welcome back! Signed in as ${data.email}`
      );
      router.push(redirect);
  
    } catch (error: any) {
  
      console.log(error);
  
      toast.error( error.message || "Login failed");

    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSocialLoading(false);
    toast.success(`Connecting with ${provider}…`);
  };

  return (
    <AuthGlassCard>
      <AuthFormHeader
        title="Welcome back"
        subtitle="Sign in to continue collecting and discovering exceptional art."
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

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              label="Password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              showSuccess={Boolean(touchedFields.password && !errors.password)}
            />
          )}
        />

        <Typography
          component={Link}
          href="/forgot-password"
          variant="body2"
          sx={{
            alignSelf: "flex-end",
            color: "primary.light",
            fontWeight: 500,
            textDecoration: "none",
            "&:hover": { color: "secondary.light" },
          }}
        >
          Forgot password?
        </Typography>

        <SubmitButton loading={isSubmitting || authLoading} loadingText="Signing in…">
          Sign in
        </SubmitButton>
      </Stack>

      <AuthDivider />
      <SocialLoginButtons
        onSocialLogin={handleSocialLogin}
        disabled={isSubmitting || socialLoading}
      />

      <AuthFooterLink
        text="New to Artistry Online?"
        linkText="Create an account"
        href="/signup"
      />
    </AuthGlassCard>
  );
}

export default function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
}
