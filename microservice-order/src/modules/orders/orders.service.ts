import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { Cron, Timeout } from '@nestjs/schedule';

import { objectId } from '../../common/type/objectId.type';
import { queryOrderDto } from './dto/orders.dto';
import { STATES_ORDER_ENUM } from './constants/orders.constant';
import { OrderRepository } from './orders.repository';
import { STATE_PAYMENT_ENUM } from './constants/payment.constant';
import { INewOrder, IOrder } from './dto/orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
  ) {}

  async payment(order) {
    const findOrder = await this.getOrderById(order._id);

    if (!findOrder) {
      return;
    }

    if (findOrder.state === STATES_ORDER_ENUM.CREATED) {
      try {
        const orderStatus = await this.client
          .send(
            { cmd: 'payment' },

            {
              order: {
                orderId: order._id,
                totalPrice: order.totalPrice,
              },
              Authorization: '123456',
            },
          )
          .toPromise();
        if (orderStatus.state === STATE_PAYMENT_ENUM.DECLINED) {
          return this.updateStateOrderById(
            orderStatus.orderId,
            STATES_ORDER_ENUM.CANCELED,
          );
        }

        if (orderStatus.state === STATE_PAYMENT_ENUM.CONFIRMED) {
          this.updateStateOrderById(
            orderStatus.orderId,
            STATES_ORDER_ENUM.CONFIRMED,
          );

          setTimeout(() => {
            this.updateStateOrderById(
              orderStatus.orderId,
              STATES_ORDER_ENUM.DELIVERED,
            );
          }, 10000);
        }
      } catch (error) {
        Logger.error('PaymentService Error');
      }
    }
    return;
  }

  public async createOrder(
    newOrder: INewOrder,
    userId: objectId,
  ): Promise<IOrder> {
    newOrder.userId = userId;
    newOrder.totalPrice = newOrder.orderDetail.reduce((total, product) => {
      return (total += product.price * product.amount);
    }, 0);

    const order = await this.orderRepository.create(newOrder);

    setTimeout(() => this.payment(order), 30000);

    return order;
  }

  public async getAllOrders() {
    return await this.orderRepository.find().catch((error) => {
      throw new HttpException(error, 500);
    });
  }

  public async getOrderById(id: objectId) {
    const order = await this.orderRepository.findById(id);
    // .catch((error) => {
    //   throw new BadRequestException(error.message);
    // });

    if (!order) {
      throw new HttpException(
        'Order is incorrect or not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return order;
  }

  public async getStateOrder(id: objectId) {
    const order = await this.orderRepository
      .findById(id, 'state')
      .then()
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
    if (!order) {
      throw new HttpException(
        'Order is incorrect or not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return order;
  }

  public async getOrderByUserId(query: queryOrderDto) {
    return await this.orderRepository.find(query);
  }

  public async updateStateOrderById(id: objectId, stateOrderUpdate: string) {
    return await this.orderRepository.findById(id).then((order) => {
      if (!order) {
        return 'Order is incorrect';
      }
      if (!this.switchStateOrder(order, stateOrderUpdate))
        throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);

      order.state = stateOrderUpdate;
      return order.save();
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
