import { ApiProperty } from '@nestjs/swagger';
import { objectId } from 'src/common/type/objectId.type';
import { STATES_ORDER_ENUM } from '../constants/orders.constant';

// Response order
export class orderResponse {
  @ApiProperty()
  _id: objectId;

  @ApiProperty()
  userId: objectId;

  @ApiProperty()
  orderDetail: [orderDetail];

  @ApiProperty()
  state: STATES_ORDER_ENUM;

  @ApiProperty()
  totalPrice: number;
}

// Response state
export class stateOrderResponse {
  @ApiProperty()
  _id: objectId;

  @ApiProperty()
  state: STATES_ORDER_ENUM;
}

class orderDetail {
  @ApiProperty({ type: String })
  productName: string;

  @ApiProperty({ type: String })
  price: number;

  @ApiProperty({ type: String })
  amount: number;
}
