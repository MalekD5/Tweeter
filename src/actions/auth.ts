"use server";

import { IRON_SESSION_COOKIE_NAME, SessionData } from "@/lib/auth";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schemas";
import { signUpSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSession = cache(
  async () =>
    await getIronSession<SessionData>(cookies(), {
      cookieName: IRON_SESSION_COOKIE_NAME,
      password: process.env.IRON_SESSION_SECRET!,
    }),
);

export async function logout() {
  const session = await getSession();

  session.destroy();
}

export async function completeSignUp(
  _prevState: _StepServerAction,
  formData: FormData,
): Promise<_StepServerAction> {
  const session = await getSession();

  if (!session.id)
    return {
      success: false,
      error: "Not logged in",
    };

  if (session.username)
    return {
      success: false,
      error: "Complete signup already done",
    };

  const checkFormat = await signUpSchema.safeParseAsync({
    username: formData.get("username") as string,
    displayName: formData.get("displayName") as string,
    birthDay: new Date(formData.get("birthDay") as string),
    bio: formData.get("bio") as string,
    location: formData.get("location") as string,
  });

  if (checkFormat.error) {
    console.log(checkFormat.error.message);
    return {
      success: false,
      error: "failed to parse form data",
    };
  }

  const { data } = checkFormat;

  await db
    .update(usersTable)
    .set({
      username: data.username,
      dateOfBirth: new Date(data.birthDay),
      name: data.displayName,
      location: data.location,
      bio: data.bio,
    })
    .where(eq(usersTable.id, session.id));

  session.username = checkFormat.data.username;
  session.displayName = checkFormat.data.displayName;

  await session.save();

  return {
    success: true,
    redirect: true,
  };
}
