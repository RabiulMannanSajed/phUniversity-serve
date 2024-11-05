import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
// here we making our won error system
// const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {

const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong ';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong   ',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    //  here we over write to show the error in proper way
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
export default globalErrorhandler;

// Error Pattern
/**
 *  success
 *  message
 * errorSources:[
 *     path:''
 *     message:""
 * ]
 */
