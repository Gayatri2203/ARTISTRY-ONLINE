/** Shared responsive layout tokens for the landing page */
export const sectionPy = { xs: 6, sm: 8, md: 12 } as const;

export const sectionGridSpacing = { xs: 2, sm: 2.5, md: 3 } as const;

export const touchTarget = {
  minHeight: 44,
  minWidth: 44,
} as const;

export const touchIconButton = {
  ...touchTarget,
  p: 1.25,
} as const;
