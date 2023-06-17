/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../../config/index';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log('🚀 globalErrorHandler ~', { error })
    : console.log('🚀 globalErrorHandler ~', error);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifyError = handleValidationError(error);

    // set response according to handleValidationError response
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedZodError = handleZodError(error);

    // set response according to handleZodError response
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
    errorMessages = simplifiedZodError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedCastError = handleCastError(error);

    // set response according to handleCastError response
    statusCode = simplifiedCastError.statusCode;
    message = simplifiedCastError.message;
    errorMessages = simplifiedCastError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;

// path:
// message:
