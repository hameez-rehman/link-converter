import { NotImplementedException } from '@nestjs/common';
import { LinkParser } from '../link-parser';

export class DefaultLinkParser extends LinkParser {
  weblinkRegex: RegExp;
  deeplinkRegex: RegExp;

  constructor(url: string) {
    super(url);
  }

  parseDeeplink() {
    throw new NotImplementedException('Default does not parse');
  }

  parseWeblink() {
    throw new NotImplementedException('Default does not parse');
  }

  toDeeplink() {
    return `${process.env.DEEPLINK_URL}?Page=Home`;
  }

  toWeblink() {
    return process.env.BASE_URL;
  }
}
