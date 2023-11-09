import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../common/reponse.interceptor';
import { ConverterService } from './converter.service';
import { GetDeeplinkQueryDto } from './dto/get-deeplink.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get('deeplink')
  getDeeplink(@Query() query: GetDeeplinkQueryDto) {
    return this.converterService.convertToDeeplink(query.weblink);
  }
}
