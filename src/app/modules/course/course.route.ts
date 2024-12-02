import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';

const route = express.Router();

route.post(
  '/create-course',
  validationRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

route.get('/', CourseController.getAllCourse);

route.get('/:id', CourseController.getSingleCourse);

route.patch(
  '/:id',
  validationRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);

route.delete('/:id', CourseController.deleteCourse);

route.put(
  '/:courseId/assign-faculties',
  CourseController.assignFacultiesWithCourse,
);
route.delete(
  '/:courseId/remove-faculties',
  CourseController.removeFacultiesWithCourse,
);

export const CourseRoute = route;
