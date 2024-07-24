import type { DestroySession } from "../common/auth.type";

type Context = {
  destroySession: DestroySession;
};

export function signOutUseCase(context: Context) {
  context.destroySession();
}
