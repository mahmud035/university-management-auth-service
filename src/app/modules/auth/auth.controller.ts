import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.services';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...othersInfo } = result;

  //* Set refreshToken into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  // res.cookie('name', value, cookieOptions)
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: othersInfo,
  });
});

export const AuthController = {
  loginUser,
};

// login --> default password --> change password --> needsPasswordChange --> true | false --> default true --> then false
