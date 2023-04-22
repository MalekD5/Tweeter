import type { Request, Response } from 'express';
import { createTokens, jwtCookieOptions } from '@/utils/JWTUtils';
import { find, setRefreshToken } from '@/models/authModel';
import { find as findUser } from '@/models/userModel';
import bcrypt from 'bcrypt';

export default async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await find(email);

  if (!user) return res.sendStatus(401);
  const check = await bcrypt.compare(password, user.password);
  if (check) {
    const userInfo = await findUser(user.id);
    if (!userInfo) return res.sendStatus(401);

    const { id, username, displayname, pfp } = userInfo;
    // we know that user exists here
    const [accessToken, refreshToken] = createTokens(id);

    // set refresh token and save
    await setRefreshToken(user.id, refreshToken);

    res.cookie('jwt', refreshToken, jwtCookieOptions);
    return res.status(200).json({
      token: accessToken,
      username,
      displayname,
      pfp: pfp ? `http://localhost:5000/images/${pfp}` : undefined
    });
  }
  res.sendStatus(401);
}
