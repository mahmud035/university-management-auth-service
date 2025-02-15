import express from 'express';
import { ENUM_USER_ROLL } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.STUDENT,
    ENUM_USER_ROLL.FACULTY
  ),
  AuthController.changePassword
);

// NOTE: 19-4 Alternative way to change password.
router.post(
  '/change-password-alternative-way',
  validateRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.STUDENT,
    ENUM_USER_ROLL.FACULTY
  ),
  AuthController.changePasswordAlternativeWay
);

export const AuthRoutes = router;
