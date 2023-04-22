import type { Request, Response } from 'express';
import { getBookmarks } from '@/models/bookmarkModel';
import { getLikes } from '@/models/tweetModel';
import { transformData } from '@/utils/ModelUtils';

export default async function BookmarkController(req: Request, res: Response) {
  const { offset } = req.body;
  const id = req.locals.id;
  try {
    const bookmarks = await getBookmarks(id, isNaN(offset) ? 0 : offset);
    const likes = await getLikes(id);
    const data = transformData(id, bookmarks, true, likes);

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
}
