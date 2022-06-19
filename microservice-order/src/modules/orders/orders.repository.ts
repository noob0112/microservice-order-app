import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Repository } from '../../common/repository/mongo.repository';
import { STATES_ORDER_ENUM } from './constants/orders.constant';
import { Order, OrderDocument } from './models/orders.schema';

@Injectable()
export class OrderRepository extends Repository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }

  updateStateOrderbyid(id, stateUpdate) {
    return new Promise((resole, reject) => {
      this.findById(id).then((order) => {
        if (!order) {
          reject({
            message: 'Order is incorrect',
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        if (!this.switchStateOrder(order, stateUpdate))
          reject({
            message: 'BAD_REQUEST',
            statusCode: HttpStatus.BAD_REQUEST,
          });

        order.state = stateUpdate;
        resole(order.save());
      });
    });
  }

  private switchStateOrder(order, stateOrderUpdate) {
    switch (order.state) {
      case STATES_ORDER_ENUM.CREATED:
        if (
          stateOrderUpdate !== STATES_ORDER_ENUM.CONFIRMED &&
          stateOrderUpdate !== STATES_ORDER_ENUM.CANCELED
        ) {
          return false;
        }

        return true;

      case STATES_ORDER_ENUM.CONFIRMED:
        if (
          stateOrderUpdate !== STATES_ORDER_ENUM.DELIVERED &&
          stateOrderUpdate !== STATES_ORDER_ENUM.CANCELED
        ) {
          return false;
        }

        return true;
        break;

      case STATES_ORDER_ENUM.DELIVERED:
        return false;

      case STATES_ORDER_ENUM.CANCELED:
        return false;

      default:
        break;
    }
  }
}
