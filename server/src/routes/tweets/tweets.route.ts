import express from 'express';
import { body, query } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import {
  createTweetController,
  latestTweetsController,
  UserTweetsController,
  deleteTweetController
} from '@/controllers/tweet';

const router = express.Router();

const tweetTextValidator = body('text')
  .trim()
  .isLength({ min: 1, max: 280 })
  .withMessage('text value length must be at least 1 or at most 280');

const tweetIdValidator = body('tweet_id')
  .trim()
  .isLength({ max: 36 })
  .isAlphanumeric();

const tweetIdValidQuery = query('id')
  .trim()
  .isLength({ max: 36 })
  .isAlphanumeric();

router
  .route('/')
  .post(tweetTextValidator, validationMiddleware, createTweetController)
  .get(latestTweetsController)
  .delete(tweetIdValidQuery, validationMiddleware, deleteTweetController);

router.get('/user', UserTweetsController);

export default router;
