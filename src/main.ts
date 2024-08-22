import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { corsOptions, validationOptions } from './config/index';
import { CustomExceptionFilter } from './middleware';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const port = process.env.BACKEND_PORT || 3000;
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.disable('x-powered-by');
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new CustomExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
  logger.log(`DB_PORT: ${process.env.DB_PORT}`)
  logger.log(`DB_USER: ${process.env.DB_USER}`)
  logger.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`)
  logger.log(`DB_HOST: ${process.env.DB_HOST}`)
  logger.log(`DB_TYPE: ${process.env.DB_TYPE}`)
  logger.log(`BACKEND_PORT: ${process.env.BACKEND_PORT}`)
  logger.log(`DB_NAME: ${process.env.DB_NAME}`)
}
bootstrap();
