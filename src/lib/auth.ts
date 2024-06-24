import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import { authConfig } from './auth.config';
import { accounts, users } from './db/schemas';

declare module 'next-auth' {
  /**s
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string | undefined;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }

  interface User {
    username: string;
  }
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }) as any,
  ...authConfig,
  pages: {
    signIn: '/',
  },
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      if (token.username) {
        session.user.username = token.username as any;
      }
      return session;
    },
  },
});
