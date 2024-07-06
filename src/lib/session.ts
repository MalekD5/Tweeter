import "server-only";
import { cache } from "react";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const IRON_SESSION_COOKIE_NAME = "FEED_ME_COOKIES";

export interface SessionData {
  username: string;
  displayName: string;
  image: string;
  id: string;
}

export const getSession = cache(
  async () =>
    await getIronSession<SessionData>(cookies(), {
      cookieName: IRON_SESSION_COOKIE_NAME,
      password: process.env.IRON_SESSION_SECRET!,
    }),
);
