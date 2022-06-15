import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { objectId } from 'src/common/type/objectId.type';
import { STATES_ORDER_ENUM } from '../constants/orders.constant';

// DTO order
export class orderDto {
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

//
export class objectIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  _id: objectId;
}

// DTO create order
class orderDetail {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ type: String })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: String })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class orderNewDto {
  @ApiProperty({ type: [orderDetail] })
  @ValidateNested({ each: true })
  @Type(() => orderDetail)
  @IsArray()
  @IsNotEmpty()
  orderDetail: [orderDetail];

  @IsString()
  @IsEnum(STATES_ORDER_ENUM)
  @IsOptional()
  @IsEmpty()
  state: STATES_ORDER_ENUM;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsEmpty()
  totalPrice: number;
}

// DTO update order
export class stateOrderUpdateDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsEnum(STATES_ORDER_ENUM)
  @IsNotEmpty()
  state: STATES_ORDER_ENUM;
}

// DTO query order
export class queryOrderDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  @IsOptional()
  userId: objectId;

  @ApiProperty({ type: String })
  @IsEnum(STATES_ORDER_ENUM)
  @IsOptional()
  state: STATES_ORDER_ENUM;
}
