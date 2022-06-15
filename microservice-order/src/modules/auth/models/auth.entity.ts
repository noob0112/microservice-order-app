import * as mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  address: string;
  role: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export interface IUserSignUp {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  address: string;
}

export interface IUserLogin {
  accessToken: string;
  user: IUserSignUp;
  // {
  //   _id: mongoose.Schema.Types.ObjectId;
  //   fullName: string;
  //   email: string;
  //   address: string;
  // };
}
