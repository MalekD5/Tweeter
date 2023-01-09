import { validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';

const validate = validationResult.withDefaults({
  formatter: (error) => {
    return {
      message: error.msg,
    };
  },
});

/**
 * validate the results from express-validator, else fail with status 400 (bad request)
 * @param req request
 * @param res response
 * @param next next function
 *
 */
export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validate(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
