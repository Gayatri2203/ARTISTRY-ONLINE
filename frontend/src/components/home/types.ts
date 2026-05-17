import type { ReactNode } from "react";

export type NavLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
  icon?: ReactNode;
};

export type FloatingCard = {
  title: string;
  subtitle: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
};

export type CategoryItem = {
  id: string;
  label: string;
  count: string;
  gradient: string;
  iconName: "brush" | "digital" | "photo" | "sculpture";
};

export type ArtworkItem = {
  id: string;
  title: string;
  artist: string;
  price: string;
  tag: string;
  gradient: string;
  likes?: number;
};

export type HeroShowcase = {
  title: string;
  artist: string;
  price: string;
  label: string;
  gradient: string;
};
