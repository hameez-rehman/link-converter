import { Module } from '@nestjs/common';
import { OopConverterService } from './oop-converter.service';
import { OopConverterController } from './oop-converter.controller';
import { RequestResponseModule } from '../request-response/request-response.module';

@Module({
  imports: [RequestResponseModule],
  providers: [OopConverterService],
  controllers: [OopConverterController],
})
export class OopConverterModule {}
