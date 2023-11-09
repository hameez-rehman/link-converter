import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../common/reponse.interceptor';
import { ConverterService } from './converter.service';
import { GetDeeplinkQueryDto } from './dto/get-deeplink.dto';
import { GetWeblinkQueryDto } from './dto/get-weblink.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Get('deeplink')
  getDeeplink(@Query() query: GetDeeplinkQueryDto) {
    return this.converterService.convertToDeeplink(query.weblink);
  }

  @Get('weblink')
  getWeblink(@Query() query: GetWeblinkQueryDto) {
    return this.converterService.convertToWeblink(query.deeplink);
  }
}
