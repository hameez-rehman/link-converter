import { Module } from '@nestjs/common';
import { RequestResponseService } from './request-response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestResponse } from './request-response.entity';
import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { RequestResponseRepository } from './request-response.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestResponse]),
    TypeOrmExModule.forCustomRepository([RequestResponseRepository]),
  ],
  providers: [RequestResponseService],
  exports: [RequestResponseService],
})
export class RequestResponseModule {}
