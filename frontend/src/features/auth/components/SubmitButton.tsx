"use client";

import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export type SubmitButtonProps = ButtonProps & {
  loading?: boolean;
  loadingText?: string;
};

export default function SubmitButton({
  loading = false,
  loadingText,
  children,
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="gradient"
      size="large"
      fullWidth
      disabled={disabled || loading}
      sx={{
        mt: 1,
        py: 1.5,
        fontWeight: 600,
        position: "relative",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        "&:disabled": { opacity: 0.7 },
      }}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress size={22} color="inherit" sx={{ mr: 1.25 }} />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
