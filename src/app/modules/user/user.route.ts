import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationZodSchema } from '../student/student.validation';
import validationRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.post(
  '/create-student',
  validationRequest(createStudentValidationZodSchema),
  UserControllers.createStudent,
);

export const UserRouters = route;
