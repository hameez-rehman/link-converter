import { parse } from 'querystring';

/**
 * @description parses query string to object without decoding url
 * @param query query string
 * @returns string
 */
export function parseQueryWithoutDecoding(query: string) {
  return parse(query, undefined, undefined, {
    decodeURIComponent: (uri) => uri,
  });
}
