import express from 'express';
import { ValidationChain, body, query, param } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import {
  createTweetController,
  latestTweetsController,
  UserTweetsController,
  deleteTweetController,
  IdController
} from '@/controllers/tweet';

const router = express.Router();

const validateId = (chain: ValidationChain) =>
  chain.trim().isAlphanumeric().isLength({ max: 36 });

const tweetTextValidator = body('text')
  .trim()
  .isLength({ min: 1, max: 280 })
  .withMessage('text value length must be at least 1 or at most 280');

const tweetIdParam = validateId(param('id')).withMessage(
  'Id paramter is required'
);

const tweetIdValidQuery = validateId(query('id'));

router
  .route('/')
  .post(tweetTextValidator, validationMiddleware, createTweetController)
  .delete(tweetIdValidQuery, validationMiddleware, deleteTweetController);

router.get('/id/:id', tweetIdParam, validationMiddleware, IdController);
router.get('/user', UserTweetsController);
router.get('/explore', latestTweetsController);

export default router;
