import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string | number
): string => {
  const options = { expiresIn: expireTime } as SignOptions;
  return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
