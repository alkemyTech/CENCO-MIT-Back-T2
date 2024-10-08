import { BadRequestException, ExecutionContext, Logger, Provider } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Transform } from 'class-transformer';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModuleOptions } from '@nestjs/throttler';
import { ThrottlerLimitDetail } from '@nestjs/throttler/dist/throttler.guard.interface';
import { ValidationError } from 'class-validator';

const logger = new Logger('NestApplication');

const customExceptionFactory = (errors: ValidationError[]) => {
  const result = errors.map((err) => {
    logger.error(err);
    return {
      property: err.property,
      message: err.constraints[Object.keys(err.constraints)[0]],
    };
  });
  throw new BadRequestException(result);
};

export const validationOptions = {
  whitelist: true,
  validationError: { target: false, value: false },
  // Transform: true,
  // exceptionFactory: customExceptionFactory,
};

export const corsOptions: CorsOptions = {
  origin: true,
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};

export const throttlerOptions: ThrottlerModuleOptions = [
  {
    ttl: 10000,
    limit: 6,
  },
]

export const throttlerProvider: Provider =     {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
}