"use client";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { forwardRef, useState } from "react";

import AuthTextField, { type AuthTextFieldProps } from "./AuthTextField";

export type PasswordFieldProps = Omit<AuthTextFieldProps, "type">;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(props, ref) {
    const [visible, setVisible] = useState(false);

    return (
      <AuthTextField
        ref={ref}
        type={visible ? "text" : "password"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={() => setVisible((v) => !v)}
                  edge="end"
                  size="small"
                  sx={{ color: "text.secondary" }}
                >
                  {visible ? (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...props}
      />
    );
  },
);

export default PasswordField;
