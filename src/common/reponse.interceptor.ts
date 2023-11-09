import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RequestResponseService } from '../request-response/request-response.service';
import { Request } from 'express';

/**
 * @description handles response map to ensure similar response interface and also creates a entry in database.
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly requestResponseService: RequestResponseService,
  ) {}

  async addToDbAndMapResponse(request: Request, responseBody: string) {
    //TODO we can use events to do this asynchronously using local event emitter;
    await this.requestResponseService.createRequestResponse(
      request.url,
      Object.values(request.query as object)[0],
      responseBody,
    );
    return { data: responseBody };
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(
        switchMap((responseBody) =>
          from(this.addToDbAndMapResponse(request, responseBody)),
        ),
      );
  }
}
