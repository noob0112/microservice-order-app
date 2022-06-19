import { objectId } from 'src/common/type/objectId.type';
import { STATES_ORDER_ENUM } from './constants/orders.constant';

export const mockUserId = 1 as unknown as objectId;

export const mockState = STATES_ORDER_ENUM;

export const mockOrder = {
  //   userId: 1,
  _id: 1 as unknown as objectId,
  orderDetail: [
    {
      productName: 'piza',
      price: 10,
      amount: 1,
    },
    {
      productName: 'piza',
      price: 10,
      amount: 1,
    },
  ],
  state: STATES_ORDER_ENUM['CREATED'],
  totalPrice: 10,
};

export const mockListOrder = [
  {
    userId: 1,
    orderDetail: [
      {
        productName: 'piza',
        price: 10,
        amount: 1,
      },
    ],
    state: STATES_ORDER_ENUM['CREATED'],
    totalPrice: 20,
  },
  {
    userId: 2,
    orderDetail: [
      {
        productName: 'piza',
        price: 10,
        amount: 1,
      },
    ],
    state: STATES_ORDER_ENUM['CREATED'],
    totalPrice: 20,
  },
];
