import { NextFunction, Request, RequestHandler, Response } from 'express';

// TODO : after read it delete
// The catchAsync function is a higher-order function designed to handle asynchronous functions in Express.js more gracefully, particularly by catching any errors that might occur during asynchronous execution and passing them to Express's error handler.

// Here’s a breakdown of how it works:

// Defining catchAsync as a Higher-Order Function:

// catchAsync takes in a function (fn) that is expected to be an asynchronous route handler (RequestHandler) and returns a new function that wraps fn.
// This wrapper function has the signature (req, res, next), which is standard for Express route handlers.
// Handling Promises and Errors:

// Inside the returned function, Promise.resolve(fn(req, res, next)) is used to ensure fn is executed, and if it returns a rejected promise (indicating an error), the .catch() method will catch the error.
// The catch block then calls next(error), which hands off the error to Express’s built-in error-handling middleware. This eliminates the need to manually wrap every async route handler in try-catch blocks, streamlining error handling across your routes.
// Using catchAsync with getAllStudents:

// When getAllStudents is called, catchAsync wraps the async function (req, res) => { ... } and ensures that any errors encountered while executing StudentService.getAllStudentFromDB() are caught and passed to the error handler.
// If no errors occur, the response is sent with a status code of 200, indicating success.
// Example Flow
// If getAllStudentFromDB succeeds:

// The result is retrieved and sent in the response with a 200 status.
// If getAllStudentFromDB fails:

// catchAsync catches the error and passes it to next, which triggers the Express error handler to manage the error response.
// Using this pattern keeps your code cleaner by abstracting error handling away from individual route definitions.

//* Higher Order Function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
export default catchAsync;
