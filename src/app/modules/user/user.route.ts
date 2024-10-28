import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const route = express.Router();

const army = (name: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(`this is an army ${name}`);
    next();
  };
};

route.post(
  '/create-student',
  army('validation'),
  UserControllers.createStudent,
);

export const UserRouters = route;
