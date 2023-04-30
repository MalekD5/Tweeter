import type { Request, Response } from 'express';
import { getBookmarks } from '@/models/bookmarkModel';

export default async function BookmarkController(req: Request, res: Response) {
  const { offset } = req.body;
  const id = req.locals.id;
  try {
    const bookmarks = await getBookmarks(id, isNaN(offset) ? 0 : offset);

    res.status(200).json(bookmarks);
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
}
