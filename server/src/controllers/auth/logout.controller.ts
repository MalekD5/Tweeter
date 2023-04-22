import { Request, Response } from 'express';
import { jwtClearCookieOptions } from '@/utils/JWTUtils';
import { findByRefreshToken, setRefreshToken } from '@/models/authModel';

export default async function logoutController(req: Request, res: Response) {
  const refreshToken = req.cookies.jwt;

  const user = await findByRefreshToken(refreshToken);
  if (!user) {
    res.clearCookie('jwt', jwtClearCookieOptions);
    return res.sendStatus(204);
  }

  // clear refreshToken from database
  await setRefreshToken(user.id, '');

  // clear cookie that contains the refresh Token
  res.clearCookie('jwt', jwtClearCookieOptions);
  return res.sendStatus(204);
}
