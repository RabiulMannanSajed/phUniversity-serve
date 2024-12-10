import catchAsync from '../../utlis/catchAsync';
import sendResponse from '../../utlis/sendResponse';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in successfully',
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  console.log(req.user, req.body);
  const user = req.user;
  const { ...passwordData } = req.body;
  console.log(passwordData, req.body);
  const result = await AuthService.changePassword(user, passwordData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in successfully',
    data: null,
  });
});
export const AuthControllers = {
  loginUser,
  changePassword,
};
