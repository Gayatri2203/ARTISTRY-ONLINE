export type FloatingCardPosition = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type FloatingCard = {
  title: string;
  subtitle: string;
  position: FloatingCardPosition;
  delay?: number;
};

export type HeroShowcase = {
  title: string;
  artist: string;
  price: string;
  label: string;
  gradient: string;
  likes?: string;
};
