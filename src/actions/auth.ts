"use server";

import { IRON_SESSION_COOKIE_NAME, SessionData } from "@/lib/auth";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getSession() {
  return await getIronSession<SessionData>(cookies(), {
    cookieName: IRON_SESSION_COOKIE_NAME,
    password: process.env.IRON_SESSION_SECRET!,
  });
}

export async function logout() {
  const session = await getSession();

  session.destroy();
}
