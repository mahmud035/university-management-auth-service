import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(400).json({ fromGlobalErrorHandler: error });
  next();
};

export default globalErrorHandler;
