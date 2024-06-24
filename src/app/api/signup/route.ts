import { auth, update } from '@/lib/auth';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schemas';
import { SignUpSchema } from '@/lib/zod';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const POST = auth(async (req) => {
  const { auth } = req;

  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (auth.user.username) return NextResponse.json({ error: 'Forbidden' }, { status: 400 });

  const body = await req.json();

  const parse = await SignUpSchema.safeParseAsync(body);
  console.log(parse);
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
      .where(eq(users.email, auth.user.email!));

    const a = await update({
      user: {
        username: data.username,
        email: auth.user.email,
      },
    });
    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
});
