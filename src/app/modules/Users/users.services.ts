import config from '../../../config/index';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // need auto generated incremental id and
  const id = await generateUserId();

  // set user's id field value
  user.id = id;

  // default password
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
