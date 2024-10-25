import express from 'express';
import { UserControllers } from './user.controller';

const route = express.Router();

route.post('/create-student', UserControllers.createStudent);

export const UserRouters = route;
