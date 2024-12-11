import config from '../../config';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new Error('user dose not exists ');
  }

  //   check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(404, 'This user is deleted ');
  }

  //   check if the user is already blocked
  if (user?.status === 'blocked') {
    throw new AppError(404, 'This user is blocked ');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new Error('user password dose not matched ');
  }

  //  Create token ans sent to the client
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  // this is access Token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string,
  );
  //  this is refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  // those value is coming from controller
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log('userData', userData);
  //* start this hole process is for the check the user
  // checking if the user exists
  const user = await User.isUserExistsByCustomId(userData.userId);
  if (!user) {
    throw new Error('user dose not exists ');
  }

  //   check if the user is already deleted
  if (user?.isDeleted) {
    throw new AppError(404, 'This user is deleted ');
  }

  //   check if the user is already blocked
  if (user?.status === 'blocked') {
    throw new AppError(404, 'This user is blocked ');
  }

  // here check the oldPass is correct
  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new Error('user password dose not matched ');
  }
  //* user checking end

  //* this for new pass
  // this is the process to pass bcrypt
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );
  console.log('newHashedPassword', newHashedPassword);

  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};
export const AuthService = { changePassword, loginUser };
