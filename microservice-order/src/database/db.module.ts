import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // ConfigModule.forRoot({}),
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/order-app`),
  ],
})
export class ConnectDBModule {}
