import { IUser } from './users.interface';
import { generateUserId } from './utils';
import config from '../../../config/index';
import { User } from './users.model';

const createUser = async (user: IUser): Promise<IUser> => {
  // need auto generated incremental id
  const id = await generateUserId();

  // set user's id field value
  user.id = id;

  // set default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new Error('Failed to create user');
  }

  return createdUser;
};

export default {
  createUser,
};
