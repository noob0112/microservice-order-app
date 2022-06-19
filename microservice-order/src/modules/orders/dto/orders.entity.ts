import { objectId } from 'src/common/type/objectId.type';
import { STATES_ORDER_ENUM } from '../constants/orders.constant';

export interface IOrder {
  _id: objectId;
  userId: objectId;
  orderDetail: [orderDetail];
  state: STATES_ORDER_ENUM;
  totalPrice: number;
}

export interface INewOrder {
  userId?: objectId;
  orderDetail: orderDetail[];
  state: STATES_ORDER_ENUM;
  totalPrice: number;
}

interface orderDetail {
  productName: string;
  price: number;
  amount: number;
}
