import { Request, Response } from 'express';
import { createAccessToken } from '../../utils/JWTUtils';
import { findByRefreshToken } from '@/models/userModel';
import jwt from 'jsonwebtoken';

export const refreshController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;

  const user = await findByRefreshToken(refreshToken);
  if (!user) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err || user?.id != decoded.userid) return res.sendStatus(403);
      const accessToken = createAccessToken(user);
      res.status(200).json({ token: accessToken });
    }
  );
};
