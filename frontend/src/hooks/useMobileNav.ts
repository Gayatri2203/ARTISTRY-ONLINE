"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useEffect, useState } from "react";

import { useBodyScrollLock } from "./useBodyScrollLock";
import { useEscapeKey } from "./useEscapeKey";

type UseMobileNavResult = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

/** Mobile navigation drawer state with scroll lock, escape key, and desktop auto-close. */
export function useMobileNav(): UseMobileNavResult {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("md"));

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, close);

  useEffect(() => {
    if (!isMobileViewport && isOpen) setIsOpen(false);
  }, [isMobileViewport, isOpen]);

  return { isOpen, open, close };
}
