import { AllParserArray, AllRegexParser } from './constants';
import { LinkParser } from './link-parser';
import { DefaultLinkParser } from './parsers/default-link.parser';

export class LinkParserFactory {
  private constructor() {}

  static getParser(url: string): LinkParser {
    const index = AllRegexParser.findIndex(
      (p) => p.weblink.test(url) || p.deeplink.test(url),
    );
    if (index < 0) {
      return new DefaultLinkParser(url);
    }

    return new AllParserArray[index](url);
  }
}
