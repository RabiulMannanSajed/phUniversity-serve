import express from 'express';
import { FacultyController } from './faculty.controller';
import validationRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import authValidation from '../../middlewares/authValidation';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.get(
  '/',
  // admin and faculty can access here
  authValidation(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getAllFaculties,
);

route.get('/:id', FacultyController.getSingleFaculty);

route.delete('/:id', FacultyController.deletedFaculty);

route.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = route;
