/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';

// NOTE: Extends Express Request object with 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null | string;
    }
  }
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(requiredRoles);

      //* (i) get authorization token
      const token = req.headers.authorization;
      // console.log('Get Token:', token);

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
      }

      //* (ii) verify token
      let verifiedUser = null;

      verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.access_token_secret as Secret
      );

      console.log(verifiedUser);
      req.user = verifiedUser; // role, userId

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
