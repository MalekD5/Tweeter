import express from 'express';
import { CommentController, UnCommentController } from '@/controllers/tweet';
import { ValidationChain, body, query } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';

const router = express.Router();

const validate = (chain: ValidationChain) =>
  chain.isAlphanumeric().withMessage('invalid tweet id');

router
  .route('/')
  .post(
    [
      validate(body('replying_to')),
      body('comment')
        .isLength({ min: 1, max: 280 })
        .withMessage('comment length must be between 1-280 character long'),
      validationMiddleware
    ],
    CommentController
  )
  .delete(
    [validate(query('comment_id')), validationMiddleware],
    UnCommentController
  );

export default router;
