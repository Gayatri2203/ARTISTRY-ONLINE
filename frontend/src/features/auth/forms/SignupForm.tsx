"use client";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/src/lib/firebase";

import AuthDivider from "../components/AuthDivider";
import AuthFooterLink from "../components/AuthFooterLink";
import AuthFormHeader from "../components/AuthFormHeader";
import AuthGlassCard from "../components/AuthGlassCard";
import AuthTextField from "../components/AuthTextField";
import PasswordField from "../components/PasswordField";
import { SocialLoginButtons } from "../components/SocialLoginButtons";
import SubmitButton from "../components/SubmitButton";
import { zodResolver } from "../lib/zodResolver";
import { ROUTES } from "@/src/lib/constants";
import { useAuthStore } from "@/src/store/authStore";

import { signupSchema, type SignupFormValues } from "../schemas";

export default function SignupForm() {
  const router = useRouter();
  const { register: registerUser, isLoading: authLoading } = useAuthStore();
  const [socialLoading, setSocialLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
<<<<<<< HEAD
    try {
  
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
  
      const user = userCredential.user;
  
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: data.name,
          email: data.email,
          createdAt: new Date(),
          bio: "",
          profileImage: "",
        }
      );
  
      toast.success(
        `Account created. Welcome, ${data.name.split(" ")[0]}!`
      );
  
    } catch (error: any) {
  
      console.log(error);
  
      toast.error(error.message);
=======
    const username = data.name.trim().replace(/\s+/g, "_").toLowerCase();
    try {
      await registerUser({
        username,
        email: data.email,
        password: data.password,
      });
      toast.success(`Account created. Welcome, ${data.name.split(" ")[0]}!`);
      router.push(ROUTES.dashboard);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Registration failed");
>>>>>>> origin/new
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSocialLoading(false);
    toast.success(`Signing up with ${provider}…`);
  };

  return (
    <AuthGlassCard sx={{ maxWidth: 480 }}>
      <AuthFormHeader
        title="Create your account"
        subtitle="Join thousands of artists and collectors on our premium marketplace."
      />

      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <AuthTextField
              {...field}
              label="Full name"
              autoComplete="name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              showSuccess={Boolean(touchedFields.name && !errors.name)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon
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
              autoComplete="new-password"
              error={Boolean(errors.password)}
              helperText={
                errors.password?.message ??
                "At least 8 characters, one uppercase and one number"
              }
              showSuccess={Boolean(touchedFields.password && !errors.password)}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordField
              {...field}
              label="Confirm password"
              autoComplete="new-password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              showSuccess={Boolean(
                touchedFields.confirmPassword && !errors.confirmPassword,
              )}
            />
          )}
        />

        <Typography variant="caption" color="text.disabled" sx={{ lineHeight: 1.5 }}>
          By signing up, you agree to our{" "}
          <Typography
            component={Link}
            href="/terms"
            variant="caption"
            sx={{ color: "text.secondary", "&:hover": { color: "primary.light" } }}
          >
            Terms
          </Typography>{" "}
          and{" "}
          <Typography
            component={Link}
            href="/privacy"
            variant="caption"
            sx={{ color: "text.secondary", "&:hover": { color: "primary.light" } }}
          >
            Privacy Policy
          </Typography>
          .
        </Typography>

        <SubmitButton loading={isSubmitting || authLoading} loadingText="Creating account…">
          Create account
        </SubmitButton>
      </Stack>

      <AuthDivider />
      <SocialLoginButtons
        onSocialLogin={handleSocialLogin}
        disabled={isSubmitting || socialLoading}
      />

      <AuthFooterLink
        text="Already have an account?"
        linkText="Sign in"
        href="/login"
      />
    </AuthGlassCard>
  );
}
