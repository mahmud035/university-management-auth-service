import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // (i) Check user exists or not
  const user = new User(); // Instance Method
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // (ii) Check password match or not
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // (iii) Generate accessToken and refreshToken using jwtHelper utility function

  return {
    // isUserExist?.needsPasswordChange
  };
};

export const AuthService = {
  loginUser,
};
