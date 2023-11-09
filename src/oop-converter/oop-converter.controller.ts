import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '../common/reponse.interceptor';
import { OopConverterService } from './oop-converter.service';
import { GetDeeplinkQueryDto } from '../converter/dto/get-deeplink.dto';

@UseInterceptors(ResponseInterceptor)
@Controller('oop-converter')
export class OopConverterController {
  constructor(private readonly converterService: OopConverterService) {}

  @Get('deeplink')
  getDeeplink(@Query() query: GetDeeplinkQueryDto) {
    return this.converterService.convertToDeeplink(query.weblink);
  }
}
