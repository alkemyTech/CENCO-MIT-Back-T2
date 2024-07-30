import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { corsOptions, validationOptions } from './config/index';
import { CustomExceptionFilter } from './middleware';
import { useContainer } from 'class-validator';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const port = 3000;
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.disable('x-powered-by');
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new CustomExceptionFilter());
  useContainer(app.select(UsersModule), { fallbackOnErrors: true })
  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}
bootstrap();
