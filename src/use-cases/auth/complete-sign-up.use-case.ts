import type { UpdateSession, UpdateUser } from "../common/auth.type";

type Context = { updateUser: UpdateUser; updateSession: UpdateSession };

type Data = {
  id: string;
  username: string;
  displayName: string;
  location?: string;
  bio?: string;
  birthDay: Date;
};

export async function completeSignUpUseCase(
  context: Context,
  data: Data,
): Promise<{ success: false; error: string } | { success: true; redirect: true }> {
  const result = await context.updateUser({
    id: data.id,
    username: data.username,
    displayName: data.displayName,
    birthDay: data.birthDay,
    location: data.location,
    bio: data.bio,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error,
    };
  }

  await context.updateSession({
    id: data.id,
    username: data.username,
    displayName: data.displayName,
  });

  return {
    success: true,
    redirect: true,
  };
}
