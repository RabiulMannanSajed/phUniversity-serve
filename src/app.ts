import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { userRouters } from './app/modules/user/user.route';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//  Application routes
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', userRouters);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  const b = 4;
  res.send(a);
};
app.get('/', getAController);

// here making the global error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
});

export default app;
