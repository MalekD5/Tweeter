import "server-only";
import { cache } from "react";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { createSessionEntity } from "@/entities/session";

export const IRON_SESSION_COOKIE_NAME = "FEED_ME_COOKIES";

export const getSession = cache(async () =>
  createSessionEntity(
    await getIronSession<SessionData>(cookies(), {
      cookieName: IRON_SESSION_COOKIE_NAME,
      password: process.env.IRON_SESSION_SECRET!,
    }),
  ),
);
