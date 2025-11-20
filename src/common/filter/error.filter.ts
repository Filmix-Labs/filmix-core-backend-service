import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { ErrorResponse, ValidationError } from '../types/response.type';

import type { Request, Response } from 'express';

function isHttpExceptionResponse(
  val: unknown,
): val is { message: string | string[]; error?: string } {
  return typeof val === 'object' && val !== null && 'message' in val;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HTTP');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    // Use Express Response typing so .status() and .json() are typed correctly
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;

    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    // default message (may be overridden below)
    let message = isHttp ? exception.message : 'Internal server error';

    const rawResponse = isHttp ? exception.getResponse() : null;

    const validationErrors: ValidationError[] = [];

    if (isHttp && isHttpExceptionResponse(rawResponse)) {
      const msg = rawResponse.message;

      if (Array.isArray(msg)) {
        // msg comes from class-validator: array of "field error" strings
        for (const entry of msg) {
          if (typeof entry !== 'string') continue;

          const parts = entry.split(' ');
          const field = parts.shift() ?? 'field';
          const text = parts.join(' ') || entry;

          validationErrors.push({ field, message: text });
        }

        message = 'Validation failed';
      } else if (typeof msg === 'string') {
        message = msg;
      }
    } else if (!isHttp && exception instanceof Error) {
      message = exception.message;
    }

    const jsonResponse: ErrorResponse = {
      meta: {
        status: 'error',
        message,
        code: status,
      },
    };

    this.logger.error(`[ > ] ${req.method} ${req.ip} ${req.url} -> ${message}`);

    if (validationErrors.length > 0) {
      jsonResponse.errors = validationErrors;
    }

    res.status(status).json(jsonResponse);
  }
}
