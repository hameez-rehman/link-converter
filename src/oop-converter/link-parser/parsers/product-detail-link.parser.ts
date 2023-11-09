import { parseQueryWithoutDecoding } from '../../../common/utils';
import { LinkParser } from '../link-parser';
import { ProductRegex } from '../parser-regex';

export class ProductDetailLinkParser extends LinkParser {
  serviceName: string;
  productName: string;
  productId: number;
  cityId?: string;
  clusterId?: number;
  weblinkRegex: RegExp;
  deeplinkRegex: RegExp;

  constructor(url: string) {
    super(url, ['productId']);
    const productRegex = ProductRegex;
    this.weblinkRegex = productRegex.weblink;

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
      this.cityId = queryParams.CityId as string;
      this.clusterId = +queryParams.ClusterId;
      this.serviceName = queryParams.ServiceName as string;
      this.productName = undefined; // unable to get this from deeplink
      this.productId = +queryParams.ContentId;
    }
  }

  parseWeblink(url: string) {
    const match = url.match(this.weblinkRegex);
    console.log(JSON.stringify(this.weblinkRegex.toString()));
    if (match) {
      const groups = match.groups;
      this.serviceName = groups.serviceName;
      this.productName = groups.productName;
      this.productId = +groups.productId;
      const queryPart = url.split('?', 2)[1];
      if (queryPart) {
        const queryParams = parseQueryWithoutDecoding(queryPart);
        this.cityId = queryParams.cityId as string;
        this.clusterId = +queryParams.clusterId;
      }
    }
  }

  toDeeplink() {
    let url = `${process.env.DEEPLINK_URL}?Page=Product&ContentId=${this.productId}&ServiceName=${this.serviceName}`;
    if (this.cityId) {
      url += `&CityId=${this.cityId}`;
    }
    if (this.clusterId) {
      url += `&ClusterId=${this.clusterId}`;
    }
    return url;
  }
}
