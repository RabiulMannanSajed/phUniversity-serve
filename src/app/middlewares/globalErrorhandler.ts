import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from './AppError';
// here we making our won error system
// const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {

// ! this error handler always handle all express errors

const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong ';

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
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof AppError) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err, // this is will show the err pattern
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
