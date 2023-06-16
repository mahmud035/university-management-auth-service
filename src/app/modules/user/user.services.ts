import { IUser } from './user.interface';
import { generateStudentId } from './user.utils';
import config from '../../../config/index';
import { User } from './user.model';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser> => {
  const academicSemester = {
    code: '01',
    year: '2025',
  };

  // need auto generated incremental id
  const id = await generateStudentId(academicSemester);

  // set user's id field value
  user.id = id;

  // set default password
  if (!user.password) {
    user.password = config.default_user_password as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};
