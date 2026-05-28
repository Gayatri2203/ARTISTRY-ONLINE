"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useState } from "react";

import { useBodyScrollLock } from "./useBodyScrollLock";
import { useEscapeKey } from "./useEscapeKey";

type UseMobileNavResult = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

/** Mobile navigation drawer state with scroll lock and escape key. */
export function useMobileNav(): UseMobileNavResult {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobileViewport = useMediaQuery(theme.breakpoints.down("md"));

  const open = useCallback(() => {
    if (isMobileViewport) {
      setIsOpen(true);
    }
  }, [isMobileViewport]);
  const close = useCallback(() => setIsOpen(false), []);

  useBodyScrollLock(isOpen);
  useEscapeKey(isOpen, close);

  return { isOpen: isMobileViewport ? isOpen : false, open, close };
}
