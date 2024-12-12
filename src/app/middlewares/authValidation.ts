import config from '../config';
import { TUserRole } from '../modules/user/user.constant';
import { User } from '../modules/user/user.model';
import catchAsync from '../utlis/catchAsync';
import AppError from './AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authValidation = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    //  if the token is form the client
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorization');
    }

    // check if the token is valid
    var decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // check the role
    const { role, userId, iat } = decoded;
    console.log(decoded);

    //* start this hole process is for the check the user
    // checking if the user exists
    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
      throw new Error('user dose not exists here');
    }

    //   check if the user is already deleted
    if (user?.isDeleted) {
      throw new AppError(404, 'This user is deleted ');
    }

    //   check if the user is already blocked
    if (user?.status === 'blocked') {
      throw new AppError(404, 'This user is blocked ');
    }

    //* Checking track the user is hacked or not
    // if the toke stolen
    // if the user change the pass then new token gen then stop the prev token
    if (
      user.passwordChangeAt &&
      User.isJwtIssuedBeforePassChange(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(401, 'You are not authorization');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not authorization');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authValidation;
