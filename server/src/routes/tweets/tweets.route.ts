import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import {
  editTweetController,
  createTweetController,
  latestTweetsController
} from '@/controllers/tweet';

const router = express.Router();

const tweetTextValidator = body('text')
  .trim()
  .isLength({ min: 1, max: 280 })
  .withMessage('text value length must be at least 1 or at most 280');

router
  .route('/')
  .post(tweetTextValidator, validationMiddleware, createTweetController)
  .get(latestTweetsController)
  .patch(tweetTextValidator, validationMiddleware, editTweetController);

export default router;
