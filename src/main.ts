import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/common/filter/error.filter';
import { ResponseInterceptor } from '@/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove unknown properties
      forbidNonWhitelisted: true, // throw error for unknown fields
      transform: true, // auto-transform payload to DTO class
      transformOptions: {
        enableImplicitConversion: true, // converts types automatically
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Filmix Docs')
    .setDescription('The Filmix API documentation')
    .setVersion('0.1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
