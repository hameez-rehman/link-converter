import { Injectable } from '@nestjs/common';
import { Parser } from './parser';

@Injectable()
export class ConverterService {
  constructor(private readonly parser: Parser) {}

  convertToDeeplink(url: string) {
    return this.parser.toDeeplink(url);
  }
}
