import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

// import configuration from './config/configuration';
import { ConnectDBModule } from './database/db.module';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      // load: [configuration],
    }),
    ScheduleModule.forRoot(),
    ConnectDBModule,
    AuthModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
