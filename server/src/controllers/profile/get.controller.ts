import { find } from '@/models/userModel';
import type { Request, Response } from 'express';
import { format, parseISO } from 'date-fns';

export default async function ProfileInfoController(
  req: Request,
  res: Response
) {
  const id = req.locals.id;
  try {
    const user = await find(id);
    if (!user) return res.sendStatus(404);

    res.status(200).json({
      bio: user.bio,
      created_at: format(
        parseISO(new Date(user.created_at).toISOString()),
        'MMM yyyy'
      )
    });
  } catch (err: any) {
    res.sendStatus(500);
    throw err;
  }
}
