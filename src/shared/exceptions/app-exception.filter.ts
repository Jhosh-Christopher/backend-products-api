import { 
    ExceptionFilter, 
    Catch, 
    ArgumentsHost,
    HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from './app-exception';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: AppException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: exception.message,
            });
    }
}
