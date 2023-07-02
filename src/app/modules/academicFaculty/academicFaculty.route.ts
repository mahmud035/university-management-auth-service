import express from 'express';
import { ENUM_USER_ROLL } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLL.SUPER_ADMIN, ENUM_USER_ROLL.ADMIN),
  AcademicFacultyController.createFaculty
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.FACULTY
  ),
  AcademicFacultyController.updateFaculty
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLL.SUPER_ADMIN, ENUM_USER_ROLL.ADMIN),
  AcademicFacultyController.deleteFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.FACULTY,
    ENUM_USER_ROLL.STUDENT
  ),
  AcademicFacultyController.getSingleFaculty
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLL.SUPER_ADMIN,
    ENUM_USER_ROLL.ADMIN,
    ENUM_USER_ROLL.STUDENT
  ),
  AcademicFacultyController.getAllFaculties
);

export const AcademicFacultyRoutes = router;
