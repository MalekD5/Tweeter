import type { Request, Response } from 'express';
import { unbookmark } from '@/models/bookmarkModel';

export default async function UnBookmarkController(
  req: Request,
  res: Response
) {
  const tweet_id = req.query.id as string;
  const user_id = req.locals.id;

  try {
    await unbookmark(user_id, tweet_id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
}
