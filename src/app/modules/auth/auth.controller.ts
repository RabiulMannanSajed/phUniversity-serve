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
  const { ...passwordData } = req.body;
  console.log('pass', passwordData);

  const result = await AuthService.changePassword(req.user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is change Password successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
