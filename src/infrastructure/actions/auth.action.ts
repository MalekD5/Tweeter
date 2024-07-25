"use server";

import { signUpSchema } from "@/lib/zod";
import { AuthedProcedure } from "./common.action";
import { signOutUseCase } from "@/use-cases/auth/logout.use-case";
import { completeSignUpUseCase } from "@/use-cases/auth/complete-sign-up.use-case";
import { updateUser } from "@/infrastructure/database/user.repository";

export const signOutAction = AuthedProcedure.createServerAction().handler(async ({ ctx }) => {
  const session = ctx.session;

  signOutUseCase({ destroySession: session.destroy });
});

export const completeSignUpAction = AuthedProcedure.createServerAction()
  .input(signUpSchema)
  .handler(async ({ ctx, input }) => {
    const session = ctx.session;
    return await completeSignUpUseCase(
      {
        updateUser,
        updateSession: session.updateSession,
      },
      {
        id: session.id,
        ...input,
      },
    );
  });
