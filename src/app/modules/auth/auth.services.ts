import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  // check user exist or not
  const isUserExist = await User.findOne(
    { id: id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  );

  console.log(password, isUserExist);
};

export const AuthService = {
  loginUser,
};
