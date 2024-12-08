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
route.patch(
  '/:id',
  validationRequest(OfferedCourseValidation.updateOfferedCourseValidation),
  OfferedCourseController.updateOfferedCourse,
);
export const OfferedCourseRoutes = route;
