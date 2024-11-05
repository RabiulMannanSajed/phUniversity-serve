import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validationRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const route = express.Router();

route.post(
  '/create-academic-department',
  // validationRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidation,
  // ),
  AcademicDepartmentController.createAcademicDepartment,
);

route.get('/', AcademicDepartmentController.getAllAcademicDepartment);

route.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

route.patch(
  '/:departmentId',
  validationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidation,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = route;
