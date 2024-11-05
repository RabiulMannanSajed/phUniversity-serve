import express from 'express';
import { StudentController } from './student.controller';
import validationRequest from '../../middlewares/validateRequest';
import { updateStudentValidationZodSchema } from './student.validation';

const route = express.Router();

// route.post('/create-student', StudentController.createStudent);

route.get('/', StudentController.getAllStudents);

route.get('/:studentId', StudentController.getSingleStudent);

route.patch(
  '/:studentId',
  validationRequest(updateStudentValidationZodSchema),
  StudentController.updateStudent,
);

route.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = route;
