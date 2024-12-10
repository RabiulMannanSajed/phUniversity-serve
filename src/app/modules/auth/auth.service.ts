import config from '../../config';
import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
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

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = (user: { userId: string; role: string }, payload) => {
  const result = User.findOneAndUpdate({
    id: user.userId,
    role: user.role,
  });
};
export const AuthService = { changePassword, loginUser };
