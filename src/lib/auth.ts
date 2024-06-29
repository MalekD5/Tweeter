import { Google } from "arctic";

export const IRON_SESSION_COOKIE_NAME = "FEED_ME_COOKIES";

export interface SessionData {
  username: string;
  displayName: string;
  image: string;
  id: string;
}

export const google = new Google(
  process.env.AUTH_GOOGLE_ID!,
  process.env.AUTH_GOOGLE_SECRET!,
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/oauth/google/callback`,
);
