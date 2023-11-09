import { Test, TestingModule } from '@nestjs/testing';
import { OopConverterService } from './oop-converter.service';

describe('ConverterService', () => {
  let service: OopConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OopConverterService],
    }).compile();

    service = module.get<OopConverterService>(OopConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Should convert product page to deeplink', () => {
    it('should convert to product page with city id to deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw',
      );

      expect(deeplink).toBe(
        'washmen://?Page=Product&ContentId=1894501&ServiceName=clean-and-press&CityId=994892-asda0-123-asdqw',
      );
    });

    it('should convert to product page with cluster id to deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/finery/blouse-p-1925865?clusterId=439892',
      );

      expect(deeplink).toBe(
        'washmen://?Page=Product&ContentId=1925865&ServiceName=finery&ClusterId=439892',
      );
    });

    it('should convert to product page with no query params to deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/finery/blouse-p-1925865',
      );

      expect(deeplink).toBe(
        'washmen://?Page=Product&ContentId=1925865&ServiceName=finery',
      );
    });

    it('should convert to product page with city and cluster id to deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/finery/blouse-p-1925865?cityId=994892-asda0-123-asdqw&clusterId=439892',
      );

      expect(deeplink).toBe(
        'washmen://?Page=Product&ContentId=1925865&ServiceName=finery&CityId=994892-asda0-123-asdqw&ClusterId=439892',
      );
    });
  });

  describe('Should convert product deeplink to page', () => {
    it('should convert to product deeplink with city id to page', () => {
      const weblink = service.convertToWeblink(
        'washmen://?Page=Product&ServiceName=clean-and-press&ContentId=1894501&CityId=994892-asda0-123-asdqw',
      );

      expect(weblink).toBe(
        'https://www.washmen.com/clean-and-press/1894501?cityId=994892-asda0-123-asdqw',
      );
    });

    it('should convert to product deeplink with no query to page', () => {
      const weblink = service.convertToWeblink(
        'washmen://?Page=Product&ServiceName=finery&ContentId=1925865',
      );

      expect(weblink).toBe('https://www.washmen.com/finery/1925865');
    });

    it('should convert to product deeplink with city and cluster id to page', () => {
      const weblink = service.convertToWeblink(
        'washmen://?Page=Product&ServiceName=finery&ContentId=1925865&CityId=994892-asda0-123-asdqw&ClusterId=439892',
      );

      expect(weblink).toBe(
        'https://www.washmen.com/finery/1925865?cityId=994892-asda0-123-asdqw&clusterId=439892',
      );
    });

    it('should convert to product deeplink with cluster id to page', () => {
      const weblink = service.convertToWeblink(
        'washmen://?Page=Product&ServiceName=finery&ContentId=1925865&ClusterId=439892',
      );

      expect(weblink).toBe(
        'https://www.washmen.com/finery/1925865?clusterId=439892',
      );
    });
  });

  describe('Should convert search page to deeplink', () => {
    it('should convert to search page with price query to deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/sr?q=price',
      );

      expect(deeplink).toBe('washmen://?Page=Search&Query=price');
    });

    it('should convert to search page with url encoding to deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/sr?q=%C3%BCt%C3%BC',
      );

      expect(deeplink).toBe('washmen://?Page=Search&Query=%C3%BCt%C3%BC');
    });
  });

  describe('Should convert search deeplink to page', () => {
    it('should convert to search deeplink with price query to page', () => {
      const deeplink = service.convertToWeblink(
        'washmen://?Page=Search&Query=price',
      );

      expect(deeplink).toBe('https://www.washmen.com/sr?q=price');
    });

    it('should convert to search deeplink with url encoding to page', () => {
      const deeplink = service.convertToWeblink(
        'washmen://?Page=Search&Query=%C3%BCt%C3%BC',
      );

      expect(deeplink).toBe('https://www.washmen.com/sr?q=%C3%BCt%C3%BC');
    });
  });

  describe('Should convert default page', () => {
    it('should convert to default deeplink', () => {
      const deeplink = service.convertToDeeplink(
        'https://www.washmen.com/account/favorites',
      );

      expect(deeplink).toBe('washmen://?Page=Home');
    });

    it('should convert to default weblink', () => {
      const weblink = service.convertToWeblink('washmen://?Page=Favorites');

      expect(weblink).toBe('https://www.washmen.com');
    });
  });
});
