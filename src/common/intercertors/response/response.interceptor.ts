import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  private readonly logger = new Logger('ProductsService');
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        message: 'Operation completed successfully',
        data,
      })),
      catchError((err) => {
        this.logger.error(err);
        throw new HttpException(
          {
            status: 'error',
            message: err.message || 'An error occurred',
            error: err.response || err,
          },
          err.status,
        );
      }),
    );
  }
}
