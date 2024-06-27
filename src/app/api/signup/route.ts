import { getSession } from "@/actions/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schemas";
import { SignUpSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (session.username)
    return NextResponse.json({ error: "Forbidden" }, { status: 400 });

  const body = await req.json();

  const parse = await SignUpSchema.safeParseAsync(body);

  if (parse.error) {
    return NextResponse.json({ error: parse.error.message }, { status: 400 });
  }

  const { data } = parse;

  try {
    await db
      .update(users)
      .set({
        username: data.username,
        dateOfBirth: new Date(data.birthDay),
        name: data.displayName,
        location: data.location,
        bio: data.bio,
      })
      .where(eq(users.id, session.id));

    session.username = data.username;
    session.displayName = data.displayName;

    await session.save();

    return new Response(undefined, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
