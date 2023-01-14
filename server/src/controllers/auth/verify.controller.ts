import { Request, Response } from 'express';
import { verifyEmail } from '@/models/verifyModel';

export default async function verifyController(req: Request, res: Response) {
  const { verifyCode } = req.body;
  try {
    const response = await verifyEmail(verifyCode);
    if (!response) {
      res.sendStatus(204);
      return;
    }
    res.status(200).json({ "message": "verified"})
  } catch (err: any) {
    res.status(500).json({ message: (err as Error).message });
  }
}
