import { Controller, UnauthorizedException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'payment' })
  payment(data) {
    if (data.Authorization !== '123456') {
      throw new UnauthorizedException('Unauthorized');
    }
    return this.appService.payment(data.order);
  }
}
