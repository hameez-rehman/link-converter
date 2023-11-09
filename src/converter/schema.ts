/**
 * @description Schema file to seed Parser class.
 */
export const schemas = [
  {
    webLinkEndpoint:
      'https://www.washmen.com/{serviceName}/{productName}-p-{productId}?cityId={cityId}&clusterId={clusterId}',
    deepLinkEndpoint:
      'washmen://?Page=Product&ContentId={productId}&CityId={cityId}&ClusterId={clusterId}&ServiceName={serviceName}',
    requiredFields: ['productId', 'serviceName'],
  },
  {
    webLinkEndpoint: 'https://www.washmen.com/sr?q={q}',
    deepLinkEndpoint: 'washmen://?Page=Search&Query={q}',
    requiredFields: ['q'],
  },
];
