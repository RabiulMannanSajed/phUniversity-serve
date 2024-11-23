import express from 'express';
import { UserControllers } from './user.controller';
import { createStudentValidationZodSchema } from '../student/student.validation';
import validationRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';

const route = express.Router();
// this to create a student
route.post(
  '/create-student',
  validationRequest(createStudentValidationZodSchema),
  UserControllers.createStudent,
);

//  this is for create a faculty
route.post(
  '/create-faculty',
  validationRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
//  this is for create an Admin
route.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRouters = route;
