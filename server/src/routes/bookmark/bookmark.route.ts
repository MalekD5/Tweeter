import BookmarkController from '@/controllers/bookmark/bookmark.controller';
import addBookmarkController from '@/controllers/bookmark/add.controller';
import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';

const router = express.Router();

const checkOffset = body('offset')
  .isNumeric()
  .withMessage('offset should be a number');

const checkTweetId = body('id').isAlphanumeric();

router
  .route('/')
  .get(checkOffset, validationMiddleware, BookmarkController)
  .post(checkTweetId, validationMiddleware, addBookmarkController);

export default router;
