import { objectId } from 'src/common/type/objectId.type';
import { STATES_ORDER_ENUM } from './constants/orders.constant';

export const mockUserId = '629ef70824632a17532f4378' as unknown as objectId;

export const mockOrder = {
  //   userId: 1,
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
