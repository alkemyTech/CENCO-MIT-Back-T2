import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

type ExceptionResponse = {
  message: string[],
  error: string,
  statusCode: number
}

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new Logger(CustomExceptionFilter.name);
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionMessage = (exception.getResponse() as ExceptionResponse).message 
    const log = exceptionMessage ? `${exception.name}: ${exceptionMessage}` : exception.message

    this.logger.error(log)
    
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
        additionalInfo: exception.getResponse()
      });
  }
}