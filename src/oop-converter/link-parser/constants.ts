import { ProductRegex, SearchRegex } from './parser-regex';
import { ProductDetailLinkParser } from './parsers/product-detail-link.parser';
import { SearchLinkParser } from './parsers/search-link.parser';

// order is important
export const AllParserArray = [ProductDetailLinkParser, SearchLinkParser];

export const AllRegexParser = [ProductRegex, SearchRegex];
