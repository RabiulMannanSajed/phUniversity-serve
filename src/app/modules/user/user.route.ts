import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { createStudentValidationZodSchema } from '../student/student.validation';
import validationRequest from '../../middlewares/validateRequest';

const route = express.Router();

route.post(
  '/create-student',
  validationRequest(createStudentValidationZodSchema),
  UserControllers.createStudent,
);

export const UserRouters = route;
