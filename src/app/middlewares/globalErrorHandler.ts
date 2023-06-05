import { Request, Response } from 'express';
import config from '../../config/index';
import { IGenericErrorMessage } from '../../interfaces/error';

const globalErrorHandler = (error: any, req: Request, res: Response) => {
  const statusCode = 500;
  const message = 'Something went wrong';
  const errorMessages: IGenericErrorMessage[] = [];

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
