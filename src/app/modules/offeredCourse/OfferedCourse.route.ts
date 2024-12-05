import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCours.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const route = express.Router();
route.post(
  '/create-offered-course',
  validationRequest(OfferedCourseValidation.createOfferedCourseValidation),
  OfferedCourseController.createOfferedCourse,
);

export const OfferedCourseRoutes = route;
