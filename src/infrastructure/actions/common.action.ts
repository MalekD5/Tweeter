import { getSession } from "@/lib/session";
import { createServerActionProcedure, ZSAError } from "zsa";

export const AuthedProcedure = createServerActionProcedure().handler(async () => {
  const session = await getSession();
  if (!session.isValid()) {
    throw new ZSAError("NOT_AUTHORIZED", {
      success: false,
      error: "Not logged in",
    });
  }

  return {
    session,
  };
});
