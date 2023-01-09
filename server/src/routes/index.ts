import express from 'express';
import registerRoute from './auth/registerRoute';
import loginRoute from './auth/loginRoute';
import refreshRoute from './auth/refreshRoute';
import logoutRoute from './auth/logoutRoute';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use('/', registerRoute);
router.use('/', loginRoute);
router.use('/', refreshRoute);
router.use('/', logoutRoute);

// routes added after this middleware requires authentication (access token)
router.use(authMiddleware);

export default router;
