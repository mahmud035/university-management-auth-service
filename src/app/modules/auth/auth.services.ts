import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // (i) Check user exists or not
  const isUserExist = await User.findOne(
    { id: id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // (ii) Check password match or not
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // (iii) Generate accessToken and refreshToken using jwtHelper utility function
};

export const AuthService = {
  loginUser,
};
