import express from 'express';
import validationRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validtion';
import { AuthControllers } from './auth.controller';
import authValidation from '../../middlewares/authValidation';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

//! Naver user auth Gard in the login and refresh
route.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

route.post(
  '/change-password',
  authValidation(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

route.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

route.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);
export const AuthRoute = route;
