import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await UserService.createUser(user);

  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
};
