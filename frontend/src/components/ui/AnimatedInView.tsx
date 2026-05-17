"use client";

import type { SxProps, Theme } from "@mui/material/styles";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";

import { viewportOnce } from "@/src/lib/motion";

import { MotionBox } from "./MotionBox";

export type AnimatedInViewProps = {
  children: ReactNode;
  variants: Variants;
  sx?: SxProps<Theme>;
  /** When true, animates on mount instead of on scroll into view. */
  animateOnMount?: boolean;
};

export function AnimatedInView({
  children,
  variants,
  sx,
  animateOnMount = false,
}: AnimatedInViewProps) {
  return (
    <MotionBox
      initial="hidden"
      {...(animateOnMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: viewportOnce })}
      variants={variants}
      sx={sx}
    >
      {children}
    </MotionBox>
  );
}
