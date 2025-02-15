/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';

// IMPORTANT: Extends Express Request object with 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null;
    }
  }
}

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(requiredRoles);

      //* Step 1: Get authorization token
      const token = req.headers.authorization;
      // console.log('Get Token:', token);

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
      }

      //* Step 2: Verify token
      let verifiedUser = null;

      verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.access_token_secret as Secret
      ) as JwtPayload;

      // console.log(verifiedUser);
      /*
        {  
          userId: 'A-00001', 
          role: 'admin', 
          iat: 1692797608, 
          exp: 1701437608  
        }
      */

      // IMPORTANT:
      // console.log(verifiedUser);
      req.user = verifiedUser; // 'role', 'userId' ache.

      //? role diye guard korar jonno
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
