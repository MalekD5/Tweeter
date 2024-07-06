import { Google } from "arctic";

export const google = new Google(
  process.env.AUTH_GOOGLE_ID!,
  process.env.AUTH_GOOGLE_SECRET!,
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/oauth/google/callback`,
);
