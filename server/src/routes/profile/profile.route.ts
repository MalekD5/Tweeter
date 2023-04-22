import { Router } from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '@/middleware/validationMiddleware';
import UpdateProfileController from '@/controllers/profile/post.controller';
import ProfileInfoController from '@/controllers/profile/get.controller';
const router = Router();

router
  .route('/')
  .get(ProfileInfoController)
  .post(
    body('displayname')
      .trim()
      .isAlphanumeric()
      .isLength({ min: 5, max: 40 })
      .withMessage('display'),
    body('username')
      .trim()
      .isAlphanumeric()
      .isLength({ min: 5, max: 25 })
      .withMessage('user'),
    body('bio').trim().optional().isLength({ max: 280 }).withMessage('bio'),
    validationMiddleware,
    UpdateProfileController
  );

export default router;
