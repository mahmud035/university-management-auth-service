import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
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
    !(await user.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //* (iii) Generate accessToken and refreshToken using jwtHelper utility function

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken: string | JwtPayload;

  //* (i) verify token
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    ) as JwtPayload;

    // console.log(verifiedToken, 'verifiedToken');
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken; // role, userId ache.

  // user delete hoye geche, kintu token ekhono roye geche.
  //* (ii) checking deleted user's refreshToken

  // creating instance of User
  const user = new User(); // Instance Method

  // access to our instance methods
  const isUserExist = await user.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //* (iii) generate new accessToken
  const newAccessToken = jwtHelper.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  userFromToken: JwtPayload | null | undefined,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  //* (i) Check user exists or not
  // creating instance of User
  const user = new User(); // Instance Method

  // access to our instance methods
  const isUserExist = await user.isUserExist(userFromToken?.userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //* (ii) Check old password is correct or not
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  //* (iii) Hashed password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  //* (iv) Update password
  const query = { id: userFromToken?.userId };
  const updatedData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };

  await User.findOneAndUpdate(query, updatedData);
};

// WARNING: NOTE: 19-4 Alternative way to change password.

const changePasswordAlternativeWay = async (
  userFromToken: JwtPayload | null | undefined,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword } = payload;

  //* (i) Check user exists or not
  const user = new User(); // Instance Method

  // This part is different from previous one
  const isUserExist = await User.findOne({ id: userFromToken?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // FIXME: 2nd time password changed isn't working properly. May be user & User er moddhe issue ache  and user.model.ts er Static Method babohar korte hobe.
  //* (ii) Check old password is correct or not
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  //* (iii) Data Update
  isUserExist.needsPasswordChange = false;

  //* (iv) Updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  changePasswordAlternativeWay,
};
