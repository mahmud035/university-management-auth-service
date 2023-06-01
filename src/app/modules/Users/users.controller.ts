import { Request, Response } from 'express';
import usersServices from './users.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await usersServices.createUser(user);

    res.status(200).send({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Failed to create user',
    });
  }
};

export default {
  createUser,
};
