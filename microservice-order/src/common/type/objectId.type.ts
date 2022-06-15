import * as mongoose from 'mongoose';

export type objectId = mongoose.Schema.Types.ObjectId;

type user = {
  phone?: number;
  name: string;
};
