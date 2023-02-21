import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '../../middleware/validationMiddleware';
import { createPostController } from '../../controllers/tweet/createTweet.controller';
import { latestPostsController } from '../../controllers/tweet/latestTweets.controller';

const router = express.Router();

const postTextValidator = body('text')
  .trim()
  .escape()
  .isLength({ min: 1, max: 280 })
  .withMessage('text value length must be at least 1 or at most 280');

router
  .route('/')
  .post(postTextValidator, validationMiddleware, createPostController)
  .get(latestPostsController);

export default router;
