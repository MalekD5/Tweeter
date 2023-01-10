import express from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '../../middleware/validationMiddleware';
import { createPostController } from '../../controllers/post/createPostController';
import { latestPostsController } from '../../controllers/post/latestPostController';

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
