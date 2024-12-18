import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ManagerException } from './manager.exception';

/**
 * Unified Handling of Business Exceptions
 */
@Catch(ManagerException)
export class ManagerExceptionFilter implements ExceptionFilter {
    catch(exception: ManagerException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(exception.getCode()).json({ code: exception.getCode(), message: exception.getMessage() });
        console.error(// tslint:disable-line
            `Business Exception, business-code: ${getRandomCode()}, status: %s, message: %s \n%s `,
            exception.getCode(),
            exception.getMessage(),
            exception.getDetail() || '');
    }
}

function getRandomCode() {
    const min = 1;
    const max = 9999;
    return Math.floor(Math.random() * (max - min) + min);
}