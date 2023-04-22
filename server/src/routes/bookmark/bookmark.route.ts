import BookmarkController from '@/controllers/bookmark/bookmark.controller';
import addBookmarkController from '@/controllers/bookmark/add.controller';
import express from 'express';
import { body, query } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import UnBookmarkController from '@/controllers/bookmark/remove.controller';

const router = express.Router();

const checkOffset = body('offset')
  .isNumeric()
  .withMessage('offset should be a number');

const checkTweetId = body('tweet_id').isAlphanumeric();

router
  .route('/')
  .get(BookmarkController)
  .post(checkTweetId, validationMiddleware, addBookmarkController)
  .delete(
    query('id').isAlphanumeric(),
    validationMiddleware,
    UnBookmarkController
  );

export default router;
