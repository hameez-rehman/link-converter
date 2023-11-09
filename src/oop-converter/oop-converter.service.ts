import { BadRequestException, Injectable } from '@nestjs/common';
import { LinkParserFactory } from './link-parser/link-parser.factory';

@Injectable()
export class OopConverterService {
  convertToDeeplink(url: string) {
    const parser = LinkParserFactory.getParser(url);
    const isValid = parser.validate();
    if (!isValid) {
      throw new BadRequestException('Url not Valid');
    }
    return parser.toDeeplink();
  }
}
