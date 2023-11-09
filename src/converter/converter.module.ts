import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { Parser } from './parser';
import { RequestResponseModule } from '../request-response/request-response.module';

@Module({
  imports: [RequestResponseModule],
  controllers: [ConverterController],
  providers: [ConverterService, Parser],
})
export class ConverterModule {}
