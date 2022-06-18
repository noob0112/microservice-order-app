import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Repository } from '../../common/repository/mongo.repository';
import { Order, OrderDocument } from './models/orders.schema';

@Injectable()
export class OrderRepository extends Repository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }
}
