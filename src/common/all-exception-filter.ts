import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as express from 'express';

/**
 * @description handles error handled or unhandled.
 */

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const environment = process.env.NODE_ENV;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<express.Response>();
    const request = ctx.getRequest<express.Request>();
    let status;
    let message;
    let stack;
    let error;
    console.log(`ALL exceptions => URL => ${request.url}`, exception);
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exceptionDetails: any = exception.getResponse().valueOf();
      message = exceptionDetails.message;
      if (Array.isArray(message)) {
        message = message.length
          ? message[0]
          : HttpStatus.INTERNAL_SERVER_ERROR;
      }

      error = exceptionDetails.error;
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        console.error(
          `Additional Exception log ===> URL = ${request.url} with Stack & error =>`,
          error,
        );
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exceptionDetails: any = exception;
      message = exceptionDetails.message;
      stack = exceptionDetails.stack;
      error = 'Unhandled Rejection';

      if (environment === 'PROD') {
        // Additional Exceptiona logs for 500 only in prod.
        console.error(
          `Additional Exception log ===> URL = ${request.url} with Stack & error =>`,
          stack,
          error,
        );
        stack = undefined;
        message = 'Internal server error';
        error = undefined;
      }
    }
    response
      .status(status)
      .json({
        statusCode: status,
        path: request.url,
        message,
        error,
        stack: environment === 'DEV' ? stack : undefined,
      })
      .emit('nest-error', exception);
  }
}
