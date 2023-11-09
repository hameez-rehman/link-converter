import { Injectable } from '@nestjs/common';
import { RequestResponseRepository } from './request-response.repository';
import { RequestResponse } from './request-response.entity';

@Injectable()
export class RequestResponseService {
  constructor(
    private readonly requestResponseRepo: RequestResponseRepository,
  ) {}

  async createRequestResponse(url: string, request: string, response: string) {
    const requestResponse = new RequestResponse({
      url,
      request,
      response,
    });
    await this.requestResponseRepo.save(requestResponse);
    return {
      success: true,
    };
  }
}
