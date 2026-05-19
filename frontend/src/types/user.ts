export interface SocialLinks {
  website?: string;
  instagram?: string;
  twitter?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  isArtist?: boolean;
  isVerified?: boolean;
}

export interface UpdateProfilePayload {
  username?: string;
  bio?: string;
  avatarUrl?: string;
  socialLinks?: SocialLinks;
}
