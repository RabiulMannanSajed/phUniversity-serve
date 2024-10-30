import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const route = express.Router();

route.post(
  '/create-academic-faculty',
  validationRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

route.get('/', AcademicFacultyController.getAllAcademicFaculties);

route.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

// TO update the id u need the validation here so add the validation in the file
route.patch(
  '/:facultyId',
  validationRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = route;
