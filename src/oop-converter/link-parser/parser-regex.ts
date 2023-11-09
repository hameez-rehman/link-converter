export const ProductRegex: ParserRegex = {
  weblink: new RegExp(
    `^${process.env.BASE_URL}/(?<serviceName>[^/]+)/(?<productName>[^/]+)-p-(?<productId>\\d+)(\\?.*)?$`,
  ),
};

export const SearchRegex: ParserRegex = {
  weblink: new RegExp(`^${process.env.BASE_URL}/sr(\\?.*)?$`),
};

export type ParserRegex = {
  weblink: RegExp;
};
