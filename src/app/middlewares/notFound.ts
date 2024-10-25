import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = 404;

  return res.status(statusCode).json({
    success: false,
    message: ' API Not Found!',
    error: ' ',
  });
};

export default notFound;
