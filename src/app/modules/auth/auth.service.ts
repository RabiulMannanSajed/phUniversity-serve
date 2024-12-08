import AppError from '../../middlewares/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const isUserExists = await User.findOne({ id: payload?.id });
  if (!isUserExists) {
    throw new Error('user dose not exists ');
  }

  //   check if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(404, 'This user is deleted ');
  }
  console.log(payload);

  return {};
};

export const AuthService = { loginUser };
