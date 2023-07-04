import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLL } from '../../../enums/user';

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

// WARNING: NOTE: 19-4 Alternative way to change password.
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
