import express from 'express';
import { UnRetweetController, RetweetController } from '@/controllers/tweet';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { body, query, ValidationChain } from 'express-validator';

const router = express.Router();

const validate = (chain: ValidationChain) =>
  chain.isAlphanumeric().isLength({ min: 32, max: 32 }).trim();

router
  .route('/')
  .post(validate(body('tweet_id')), validationMiddleware, RetweetController)
  .delete(validate(query('id')), validationMiddleware, UnRetweetController);

export default router;
