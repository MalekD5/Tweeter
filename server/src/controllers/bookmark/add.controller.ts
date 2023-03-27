import type { Request, Response } from 'express';
import { bookmark } from '@/models/bookmarkModel';

export default async function addBookmarkController(
  req: Request,
  res: Response
) {
  const { tweet_id } = req.body();
  const user_id = req.locals.userid;
  try {
    await bookmark(user_id.toString(), tweet_id);
    res.sendStatus(201);
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
}
