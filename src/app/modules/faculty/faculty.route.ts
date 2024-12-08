import express from 'express';
import { FacultyController } from './faculty.controller';
import validationRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import authValidation from '../../middlewares/authValidation';

const route = express.Router();

route.get('/', authValidation(), FacultyController.getAllFaculties);

route.get('/:id', FacultyController.getSingleFaculty);

route.delete('/:id', FacultyController.deletedFaculty);

route.patch(
  '/:id',
  validationRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);

export const FacultyRoutes = route;
