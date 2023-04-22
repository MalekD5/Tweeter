import { Request, Response } from 'express';
import { createAccessToken } from '@/utils/JWTUtils';
import { findByRefreshToken } from '@/models/authModel';
import jwt from 'jsonwebtoken';
import { find } from '@/models/userModel';

export default async function refreshController(req: Request, res: Response) {
  const refreshToken = req.cookies.jwt;

  const user = await findByRefreshToken(refreshToken);
  if (!user) {
    console.log('hi');
    return res.sendStatus(403);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any) => {
      if (err || user?.id != decoded.id) {
        console.log('error part 2');
        return res.sendStatus(403);
      }
      const userInfo = await find(user.id);
      if (!userInfo) {
        console.log('some error');
        return res.sendStatus(403);
      }

      const accessToken = createAccessToken(userInfo.id);
      res.status(200).json({ token: accessToken });
    }
  );
}
