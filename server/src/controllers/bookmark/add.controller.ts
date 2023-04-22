import type { Request, Response } from 'express';
import { bookmark } from '@/models/bookmarkModel';

export default async function addBookmarkController(
  req: Request,
  res: Response
) {
  const { tweet_id } = req.body;
  const user_id = req.locals.id;
  try {
    await bookmark(user_id, tweet_id);
    res.sendStatus(201);
  } catch (err: any) {
    const message = (err as Error).message;
    if (message.startsWith('Duplicate entry')) res.sendStatus(409);
    else res.sendStatus(500);
  }
}
