import type { Request, Response } from 'express';
import { getBookmarks } from '@/models/bookmarkModel';

export default async function BookmarkController(req: Request, res: Response) {
  const { offset } = req.body;
  const user_id = req.locals.userid;
  try {
    const bookmarks = await getBookmarks(
      user_id.toString(),
      isNaN(offset) ? 0 : offset
    );
    res.status(200).json(bookmarks);
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
}
