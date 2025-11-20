import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { ResponseWrapper, Meta } from '../types/response.type';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseWrapper<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseWrapper<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<{ statusCode: number }>();

    return next.handle().pipe(
      map((body: T): ResponseWrapper<T> => {
        if (isWrapped(body)) {
          return body as ResponseWrapper<T>;
        }

        const meta: Meta = {
          status:
            response.statusCode >= 200 && response.statusCode < 300
              ? 'success'
              : 'error',
          message: extractMessage(body),
          code: response.statusCode,
        };

        const data = extractData<T>(body);
        const final: ResponseWrapper<T> = { meta };
        if (data !== null && data !== undefined) {
          final.data = data;
        }

        return final;
      }),
    );
  }
}

function isWrapped(value: unknown): value is ResponseWrapper<unknown> {
  return typeof value === 'object' && value !== null && 'meta' in value;
}

export function extractMessage(value: unknown): string | null {
  if (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as Record<string, unknown>).message === 'string'
  ) {
    return (value as Record<string, unknown>).message as string;
  }
  return null;
}

function extractData<T>(value: unknown): T | null {
  if (typeof value === 'object' && value !== null && 'data' in value) {
    return (value as { data: T }).data;
  }

  return value as T;
}
