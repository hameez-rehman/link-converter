export const ProductRegex: ParserRegex = {
  weblink: new RegExp(
    `^${process.env.BASE_URL}/(?<serviceName>[^/]+)/(?<productName>[^/]+)-p-(?<productId>\\d+)(\\?.*)?$`,
  ),
  deeplink: new RegExp(`^${process.env.DEEPLINK_URL}\\?Page=Product(\\&.*)?$`),
};

export const SearchRegex: ParserRegex = {
  weblink: new RegExp(`^${process.env.BASE_URL}/sr(\\?.*)?$`),
  deeplink: new RegExp(`^${process.env.DEEPLINK_URL}\\?Page=Search(\\&.*)?$`),
};

export type ParserRegex = {
  weblink: RegExp;
  deeplink: RegExp;
};
