import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { ApiPropertyOptional } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { User } from '../../users/models/users.schema';
import { STATES_ORDER_ENUM } from '../constants/orders.constant';

export type OrderDocument = Order & mongoose.Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true })
  orderDetail: [
    {
      nameProduct: string;
      price: number;
      amount: number;
    },
  ];

  @Prop({ enum: STATES_ORDER_ENUM, default: STATES_ORDER_ENUM.CREATED })
  state: string;

  @Prop({ required: false })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
