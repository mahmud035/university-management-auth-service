import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// import { JwtPayload, Secret } from 'jsonwebtoken';
// import config from '../../config';
import ApiError from '../../errors/ApiError';
// import { jwtHelper } from '../../helpers/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //* (i) get authorization token
      const token = req.headers.authorization;
      console.log('get token', token);

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
      }

      console.log(requiredRoles);

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
