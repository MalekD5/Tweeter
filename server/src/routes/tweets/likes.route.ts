import express from 'express';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import { body, query } from 'express-validator';
import { LikeController, UnlikeController } from '@/controllers/tweet';
const router = express.Router();

const tweet_id = body('tweet_id').isLength({ min: 32 }).isAlphanumeric().trim();
const query_tweet_id = query('id')
  .isLength({ min: 32 })
  .isAlphanumeric()
  .trim();

router
  .route('/')
  .post(tweet_id, validationMiddleware, LikeController)
  .delete(query_tweet_id, validationMiddleware, UnlikeController);

export default router;
