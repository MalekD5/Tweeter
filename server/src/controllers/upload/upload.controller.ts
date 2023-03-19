import type { Request, Response } from 'express';
import { modifyUserPfp } from '@/models/userModel';

export default async function UploadController(req: Request, res: Response) {
  const name = req.file?.filename;
  if (!name) return res.sendStatus(400);

  const userid = req.locals.userid;
  try {
    await modifyUserPfp(userid.toString(), name!);
    res.sendStatus(200);
  } catch (err: any) {
    res.status(500).json({ error: (err as Error).message });
  }
}
