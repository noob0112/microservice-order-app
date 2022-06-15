import * as mongoose from 'mongoose';
import { Role } from '../users.constant';

export interface IUser {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  address: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  address: string;
}

export interface IUserJWT {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  role: Role;
}
