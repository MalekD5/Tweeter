import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // unauthorized

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403); // invalid token
      const { username, userid, verified } = decoded;
      if (verified !== '1')
          return res.status(403).json({ message: "the account is not verified"});
      req.locals = {
        username,
        userid
      };
      next();
    }
  );
};
