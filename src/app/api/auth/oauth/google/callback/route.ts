import { google } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "@/db";
import { usersTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/session";
import crypto from "crypto";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookies().get("code_verifier")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState || !codeVerifier) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const googleUser: GoogleUser = await googleUserResponse.json();
    // Replace this with your own DB client.
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, googleUser.id));

    if (existingUser) {
      const session = await getSession();

      session.username = existingUser.username || "";
      session.displayName = existingUser.name!;
      session.image = existingUser.image!;
      session.id = existingUser.id;

      await session.save();

      return new Response(null, {
        status: 302,
        headers: {
          location: existingUser.username ? "/home" : "/complete-signup",
        },
      });
    }

    const userId = crypto.randomUUID(); // 16 characters long

    // Replace this with your own DB client.
    await db.insert(usersTable).values({
      id: userId,
      googleId: googleUser.id,
      email: googleUser.email,
      emailVerified: googleUser.verified_email,
      name: googleUser.name,
      image: googleUser.picture,
    });

    const session = await getSession();

    session.username = "";
    session.displayName = googleUser.name!;
    session.image = googleUser.picture!;
    session.id = userId;

    await session.save();
    return new Response(null, {
      status: 302,
      headers: {
        location: "/complete-signup",
      },
    });
  } catch (e) {
    console.error(e);
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
}
