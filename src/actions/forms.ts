"use server";

import { SignUpSchema } from "@/lib/zod";
import { getSession } from "./auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";
import { eq } from "drizzle-orm";

export async function completeSignUp(
  _prevState: _StepServerAction,
  formData: FormData
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

  const checkFormat = await SignUpSchema.safeParseAsync({
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

  await db
    .update(users)
    .set({
      username: checkFormat.data.username,
      dateOfBirth: new Date(checkFormat.data.birthDay),
      name: checkFormat.data.displayName,
      location: checkFormat.data.location,
      bio: checkFormat.data.bio,
    })
    .where(eq(users.id, session.id));

  session.username = checkFormat.data.username;
  session.displayName = checkFormat.data.displayName;

  await session.save();

  return {
    success: true,
    redirect: true,
  };
}
