import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validtion';
import { AuthControllers } from './auth.controller';

const route = express.Router();

route.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
route.post(
  '/change-password',
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
export const AuthRoute = route;
