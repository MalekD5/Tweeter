import { IronSession } from "iron-session";

type _UpdateSession = {
  username?: string;
  name: string;
  image: string;
};

export class Session {
  session: IronSession<SessionData>;

  constructor(session: IronSession<SessionData>) {
    this.session = session;
  }

  async updateSession(user: Partial<_UpdateSession> & { id: string }) {
    this.session.username = user.username;
    this.session.displayName = user.name!;
    this.session.image = user.image!;
    this.session.id = user.id;

    await this.session.save();
  }

  destroy() {
    this.session.destroy();
  }

  isValid() {
    return this.session && this.session.id && this.session.username;
  }

  shouldCompleteSignUp() {
    return this.session.id && !this.session.username;
  }

  get id() {
    return this.session.id;
  }
}

export function createSessionEntity(session: IronSession<SessionData>) {
  return new Session(session);
}
