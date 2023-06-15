import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.patch('/:id', AcademicSemesterController.updateSemester);

router.get('/', AcademicSemesterController.getAllSemesters);

export const AcademicSemesterRoutes = router;

//! IMP: Dynamic route will stay TOP of all route.
