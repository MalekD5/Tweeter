import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  } // unauthorized

  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      } // invalid token
      const { username, id, pfp } = decoded;
      req.locals = {
        username,
        id,
        pfp
      };
      next();
    }
  );
};
