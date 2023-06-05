import { NextFunction, Request, Response } from 'express';
import usersServices from './users.services';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    const result = await usersServices.createUser(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createUser,
};
