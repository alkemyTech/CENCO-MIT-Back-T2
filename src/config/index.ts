import { BadRequestException, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Transform } from 'class-transformer';
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
  Transform: true,
  exceptionFactory: customExceptionFactory,
};

export const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
};
