export const ROUTES = {
  home: "/",
  explore: "/explore",
  trending: "/trending",
  categories: "/explore",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
  upload: "/upload",
  profile: (username: string) => `/profile/${username}`,
  profileEdit: "/profile/edit",
  artwork: (id: string) => `/artwork/${id}`,
} as const;

export const PROTECTED_ROUTES = ["/dashboard", "/upload", "/profile"] as const;

export const AUTH_COOKIE = "artistry_token";
