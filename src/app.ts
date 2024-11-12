import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//  Application routes

app.use('/api/v1', router);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  const b = 4;
  res.send(a);
};

app.get('/', getAController);

// ! this is not found Api error
app.use(notFound);

//! here making the global error
app.use(globalErrorhandler);

export default app;
