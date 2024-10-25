import express from 'express';
import { StudentController } from './student.controller';

const route = express.Router();

// route.post('/create-student', StudentController.createStudent);

route.get('/', StudentController.getAllStudents);

route.get('/:studentId', StudentController.getSingleStudent);

route.delete('/:studentId', StudentController.deleteStudent);

export const StudentRoutes = route;
