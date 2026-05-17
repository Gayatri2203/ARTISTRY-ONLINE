"use client";

import { useEffect } from "react";

/** Locks document body scroll while `locked` is true (e.g. mobile nav open). */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
