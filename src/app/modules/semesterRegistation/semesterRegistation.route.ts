import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidation } from './semesterRegistation.validation';
import { SemesterRegistrationController } from './semesterRegistation.controller';

const route = express.Router();

route.post(
  '/create-semester-registration',
  validationRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidation,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
