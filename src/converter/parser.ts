import { BadRequestException, Injectable } from '@nestjs/common';
import { schemas } from './schema';
import { parse as QueryParser } from 'querystring';
import { bracesRegex } from './constants';
import { parseQueryWithoutDecoding } from '../common/utils';

/**
 * @description Parser class responsible for handling schema and mapping weblink to deeplink and vice versa
 */

@Injectable()
export class Parser {
  parsedSchemas: {
    weblink: {
      url: string;
      queryParams: object;
      regex: RegExp;
    };
    deeplink: {
      url: string;
      queryParams: object;
    };
    requiredField: string[];
  }[] = [];

  curlyBracesCaptureRegex = /\{([^{}]+)\}/g;

  // Parses all schema during initial initialization to minimize process time with converting.
  constructor() {
    // can be from any data source such as db, file etc.
    schemas.forEach((schema) => {
      this.parseSchema(schema);
    });
  }

  parseWeblink(weblinkEndpoint: string) {
    const [url, query] = weblinkEndpoint.split('?', 2);
    const matches = url.match(this.curlyBracesCaptureRegex);
    let regexString = url;
    matches?.forEach((match) => {
      match = match.replace(/[{()}]/g, '');
      regexString = regexString.replace(`{${match}}`, `(?<${match}>[^/]+)`);
    });
    let queryParams = {};
    if (query?.length) {
      queryParams = QueryParser(query);
    }
    return {
      url,
      queryParams,
      regex: new RegExp(regexString),
    };
  }

  parseDeeplink(deeplinkEndpoint: string) {
    const deeplink = deeplinkEndpoint.split('?', 2);
    const deeplinkParams = QueryParser(deeplink[1]) as object;
    const deeplinkBaseUrl = deeplink[0] + '?Page=' + deeplinkParams['Page'];
    delete deeplinkParams['Page'];
    for (const key in deeplinkParams) {
      deeplinkParams[key] = deeplinkParams[key].replace(bracesRegex, '');
    }
    return {
      url: deeplinkBaseUrl,
      queryParams: deeplinkParams,
    };
  }

  parseSchema(schema: {
    webLinkEndpoint: string;
    deepLinkEndpoint: string;
    requiredFields: string[];
  }) {
    const parsedWeblink = this.parseWeblink(schema.webLinkEndpoint);
    const parsedDeeplink = this.parseDeeplink(schema.deepLinkEndpoint);
    const parsedSchema = {
      deeplink: parsedDeeplink,
      weblink: parsedWeblink,
      requiredField: schema.requiredFields,
    };
    this.parsedSchemas.push(parsedSchema);
  }

  validate(data: object, requiredFields: string[]) {
    if (!requiredFields?.length) {
      return true;
    }
    return requiredFields.every((field) => data[field]);
  }

  toDeeplink(weblink: string) {
    const schema = this.parsedSchemas.find((schema) =>
      schema.weblink.regex.test(weblink),
    );
    if (!schema) {
      return `${process.env.DEEPLINK_URL}?Page=Home`;
    }
    const [url, queryParams] = weblink.split('?', 2);
    const matches = url.match(schema.weblink.regex);
    if (matches) {
      let newParams = '';
      const groups = matches.groups || {};
      if (queryParams?.length) {
        const params = parseQueryWithoutDecoding(queryParams);
        for (const key in params) {
          groups[key] = params[key] as string;
        }
      }
      const isValid = this.validate(groups, schema.requiredField);
      if (!isValid) {
        throw new BadRequestException('Required Field is missing');
      }
      for (const key in schema.deeplink.queryParams) {
        const groupKey = schema.deeplink.queryParams[key];
        if (groups[groupKey]) {
          newParams += `&${key}=${groups[groupKey]}`;
        }
      }
      return schema.deeplink.url + newParams;
    } else {
      return `${process.env.DEEPLINK_URL}?Page=Home`;
    }
  }
}
