import "server-only";
import { db } from "@/db";
import type { CompleteSignUpDTO, UpdateUserResult } from "@/use-cases/common/auth.type";
import { usersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function updateUser(data: CompleteSignUpDTO): Promise<UpdateUserResult> {
  try {
    await db
      .update(usersTable)
      .set({
        username: data.username,
        dateOfBirth: new Date(data.birthDay),
        name: data.displayName,
        location: data.location,
        bio: data.bio,
      })
      .where(eq(usersTable.id, data.id));
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: "failed to update user information",
    };
  }
}
