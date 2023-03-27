import BookmarkController from '@/controllers/bookmark/bookmark.controller';
import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';

const router = express.Router();

const bodyValidator = body('offset')
  .isNumeric()
  .withMessage('offset should be a number');

router.route('/').get(bodyValidator, validationMiddleware, BookmarkController);

export default router;
