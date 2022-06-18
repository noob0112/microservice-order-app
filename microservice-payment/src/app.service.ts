import { Injectable, Logger } from '@nestjs/common';
import { STATE } from './app.constant';

@Injectable()
export class AppService {
  payment(order): Promise<any> {
    order.state = STATE[Math.floor(Math.random() * 2)];
    Logger.log(`${order.orderId} has  with state ${order.state}`);
    return order;
  }
}
