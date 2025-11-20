import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

import { extractMessage } from './response.interceptor';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const { method, url, ip } = request;

    this.logger.log(`[ < ] ${method} ${ip} ${url}`);

    return next.handle().pipe(
      tap((body) => {
        this.logger.log(
          `[ > ] ${method} ${ip} ${url} (${response.statusCode}) -> ${extractMessage(body)} +${Date.now() - now}ms`,
        );
      }),
    );
  }
}
