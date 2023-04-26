import express from 'express';
import tweetRouter from './tweets/tweets.route';
import retweetRouter from './tweets/retweets.route';
import likeRoute from './tweets/likes.route';
import uploadRouter from './upload/upload.route';
import bookmarkRoute from './bookmark/bookmark.route';
import profileRoute from './profile/profile.route';
import {
  registerRoute,
  loginRoute,
  logoutRoute,
  refreshRoute,
  existsRoute
} from './auth';
import { authMiddleware } from '@/middleware/authMiddleware';

const router = express.Router();

// auth routes
router.use('/', registerRoute);
router.use('/', loginRoute);
router.use('/', refreshRoute);
router.use('/', logoutRoute);
router.use('/', existsRoute);

// routes added after this middleware requires authentication (access token)
router.use(authMiddleware);
router.use('/upload', uploadRouter);
router.use('/tweet', tweetRouter);
router.use('/tweet/like', likeRoute);
router.use('/retweet', retweetRouter);
router.use('/bookmarks', bookmarkRoute);
router.use('/profile', profileRoute);

export default router;
