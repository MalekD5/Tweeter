import type { Request, Response } from 'express';
import { updateProfilePicture } from '@/models/userModel';

export default async function UploadController(req: Request, res: Response) {
  const name = req.file?.filename;
  if (!name) return res.sendStatus(400);

  const userid = req.locals.id;
  try {
    await updateProfilePicture(userid, name);
    res.status(200).json({ name });
  } catch (err: any) {
    res.status(500).json({ error: (err as Error).message });
  }
}
