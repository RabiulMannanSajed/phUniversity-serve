import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationZodSchema } from '../student/student.validation';
import validationRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';

const route = express.Router();

route.post(
  '/create-student',
  validationRequest(createStudentValidationZodSchema),
  UserControllers.createStudent,
);
// route.post('/create-faculty',validationRequest(createFacultyValidationSchema).)
//  TODO : here add the faculty post

export const UserRouters = route;
