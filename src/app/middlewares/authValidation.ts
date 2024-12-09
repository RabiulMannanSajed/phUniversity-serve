import config from '../config';
import catchAsync from '../utlis/catchAsync';
import AppError from './AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
const authValidation = () => {
  return catchAsync(async (req, res, next) => {
    //  if the token is form the client
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'You are not authorization');
    }

    // check if the token iis valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(401, 'You are not authorization');
        }
        // decoded undefined
        console.log('decoded', decoded);
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default authValidation;
