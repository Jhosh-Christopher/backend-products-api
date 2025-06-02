import { 
    ExceptionFilter, 
    Catch, 
    ArgumentsHost,
    Logger
} from '@nestjs/common';
import e, { Request, Response } from 'express';
import { AppException } from './app-exception';
import { error } from 'console';

@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger('HTTP');
    catch(exception: AppException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        if (status >= 500){ this.logger.error(`${request.method} ${request.url} - status: ${status} ${exception.message}`, exception.stack);
        }
        else if (status >= 400){ this.logger.warn(`${request.method} ${request.url} - status: ${status} ${exception.message}`);
        }
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
            error: exception.name
        };

        response
            .status(status)
            .json({
            errorResponse
        });
    }
}
