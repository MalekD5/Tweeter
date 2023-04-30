import express from 'express';
import { CommentController } from '@/controllers/tweet';
import { ValidationChain, body, param, query } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import GetCommentsController from '@/controllers/tweet/comment/getComments.controller';

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
  );

router.get(
  '/:id',
  [validate(param('id')), validationMiddleware],
  GetCommentsController
);

export default router;
