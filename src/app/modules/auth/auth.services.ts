import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
// import jwt from 'jsonwebtoken';
// import config from '../../../config';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  //* (i) Check user exists or not
  // creating instance of User
  const user = new User(); // Instance Method

  // access to our instance methods
  const isUserExist = await user.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //* (ii) Check password match or not
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //* (iii) Generate accessToken and refreshToken using jwtHelper utility function

  // const accessToken = jwt.sign(
  //   {
  //     id: isUserExist?.id,
  //     role: isUserExist?.role,
  //     password: isUserExist?.password,
  //   },
  //   config.jwt.access_token_secret,
  //   { expiresIn: config.jwt.access_token_expires_in }
  // );

  return {
    // isUserExist?.needsPasswordChange
  };
};

export const AuthService = {
  loginUser,
};
