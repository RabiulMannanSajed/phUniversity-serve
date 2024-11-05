import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

//  here making a handler for zod error to make it in our won way
const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1], // this path error value always find in the last index
      message: issue.message,
    };
  });

  let statusCode = 400;

  return {
    // those value are sending to the (simplifiedError)
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};
export default handleZodError;
