import { Controller, UnauthorizedException, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AuthGuard } from './guard/auth.guard';

@Controller('payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'payment' })
  @UseGuards(AuthGuard)
  payment(data) {
    return this.appService.payment(data.order);
  }
}
