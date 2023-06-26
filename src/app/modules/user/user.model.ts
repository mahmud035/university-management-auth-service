/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const UserSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student', // Reference with Student Model
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty', // Reference with Faculty Model
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin', // Reference with Admin Model
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// User.create() / user.save()

//* Hashing user password
UserSchema.pre('save', async function (next) {
  const user = this; // here, this equals to user object

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
