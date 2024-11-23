import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validateRequest';
import { updateStudentValidationZodSchema } from './student.validation';

const route = express.Router();

// route.post('/create-student', StudentController.createStudent);

route.get('/', StudentController.getAllStudents);

route.get('/:id', StudentController.getSingleStudent);

route.patch(
  '/:id',
  validationRequest(updateStudentValidationZodSchema),
  StudentController.updateStudent,
);

route.delete('/:id', StudentController.deleteStudent);

export const StudentRoutes = route;
