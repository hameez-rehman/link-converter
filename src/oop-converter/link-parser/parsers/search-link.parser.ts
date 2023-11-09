import { parseQueryWithoutDecoding } from '../../../common/utils';
import { LinkParser } from '../link-parser';
import { SearchRegex } from '../parser-regex';

export class SearchLinkParser extends LinkParser {
  q: string;
  weblinkRegex: RegExp;
  deeplinkRegex: RegExp;

  constructor(url: string) {
    super(url, ['q']);
    this.weblinkRegex = SearchRegex.weblink;
    this.deeplinkRegex = SearchRegex.deeplink;

    if (this.weblinkRegex.test(url)) {
      this.parseWeblink(url);
    } else if (this.deeplinkRegex.test(url)) {
      this.parseDeeplink(url);
    }
  }

  parseDeeplink(url: string) {
    const match = url.match(this.deeplinkRegex);
    if (match) {
      const queryParams = parseQueryWithoutDecoding(url.split('?', 2)[1]);
      this.q = queryParams.Query as string;
    }
  }

  parseWeblink(url: string) {
    const queryPart = url.split('?', 2)[1];
    if (queryPart) {
      const queryParams = parseQueryWithoutDecoding(queryPart);
      this.q = queryParams.q as string;
    }
  }

  toDeeplink() {
    const url = `${process.env.DEEPLINK_URL}?Page=Search&Query=${this.q}`;
    return url;
  }

  toWeblink() {
    const url = `${process.env.BASE_URL}/sr?q=${this.q}`;

    return url;
  }
}
