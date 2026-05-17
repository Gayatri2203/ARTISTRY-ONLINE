"use client";

import TextField, { type TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

export type AuthTextFieldProps = TextFieldProps & {
  /** When true, field shows success styling after valid blur (optional). */
  showSuccess?: boolean;
};

const AuthTextField = forwardRef<HTMLInputElement, AuthTextFieldProps>(
  function AuthTextField({ showSuccess, error, sx, ...props }, ref) {
    const hasError = Boolean(error);
    const isSuccess = showSuccess && !hasError && props.value;

    return (
      <TextField
        ref={ref}
        fullWidth
        variant="outlined"
        error={hasError}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            bgcolor: "rgba(255,255,255,0.03)",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            "& fieldset": {
              borderColor: hasError
                ? "error.main"
                : isSuccess
                  ? "success.main"
                  : "rgba(255,255,255,0.1)",
            },
            "&:hover fieldset": {
              borderColor: hasError
                ? "error.main"
                : "rgba(255,255,255,0.18)",
            },
            "&.Mui-focused fieldset": {
              borderColor: hasError ? "error.main" : "primary.main",
              boxShadow: (theme) =>
                hasError
                  ? `0 0 0 3px rgba(248, 113, 113, 0.2)`
                  : `0 0 0 3px ${theme.palette.action.focus}`,
            },
          },
          "& .MuiFormHelperText-root": {
            mx: 0,
            mt: 0.75,
          },
          ...sx,
        }}
        {...props}
      />
    );
  },
);

export default AuthTextField;
