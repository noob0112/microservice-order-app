import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { OrdersService } from './orders.service';
import {
  objectIdDto,
  orderDto,
  orderNewDto,
  queryOrderDto,
  stateOrderUpdateDto,
} from './dto/orders.dto';
// import { IUserJWT } from 'src/modules/users/models/users.entity';
import { Roles } from 'src/modules/auth/decorator/roles.decorator';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { RolesGuard } from 'src/modules/auth/guard/roles.guard';
import { Role } from 'src/modules/users/users.constant';
import { paramIdOrder } from './docs/orders.swagger';
// import { STATES_ORDER_ENUM } from './constants/orders.constant';

@ApiTags('orders')
@ApiBearerAuth('Authorization')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Post()
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
    type: orderDto,
  })
  @ApiBadRequestResponse({ description: 'Unvalidate.' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized.' })
  createOrder(@Body() newOrder: orderNewDto, @Req() req: Request) {
    return this.ordersService.createOrder(newOrder, req.user['_id']);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Get()
  getOrderByUserId(@Query() queryOrder: queryOrderDto) {
    return this.ordersService.getOrderByUserId(queryOrder);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOkResponse({
    description: 'return array orders',
    type: [orderDto],
  })
  @ApiBadRequestResponse({ description: 'Unvalidate.' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Unauthorized.' })
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @ApiParam(paramIdOrder)
  @Get('state/:id')
  getStateOrder(@Param() param: objectIdDto) {
    return this.ordersService.getStateOrder(param._id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @ApiParam(paramIdOrder)
  @Get(':id')
  getOrderById(@Param() param: objectIdDto) {
    return this.ordersService.getOrderById(param._id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @ApiParam(paramIdOrder)
  @Put(':id')
  updateStateOrderById(
    @Param() param: objectIdDto,
    @Body() stateOrder: stateOrderUpdateDto,
  ) {
    return this.ordersService.updateStateOrderById(param._id, stateOrder.state);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiParam(paramIdOrder)
  @Delete(':id')
  @HttpCode(204)
  deleteOrderById(@Param() param: objectIdDto) {
    return this.ordersService.deleteOrderById(param._id);
  }
}
