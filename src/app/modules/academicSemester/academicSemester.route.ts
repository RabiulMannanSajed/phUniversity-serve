import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const route = express.Router();

// this is create a semester
route.post(
  '/create-academic-semester',
  validationRequest(
    AcademicSemesterValidation.academicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
//  for get data we don't need the validation
// this route for find all semester

route.get('/', AcademicSemesterController.getAllAcademicSemester);
//  this route for findOne  semester

route.get(
  '/:academicSemesterId',
  AcademicSemesterController.getSingleAcademicSemester,
);
//  this route for update a single semester

export const AcademicSemesterRoutes = route;
