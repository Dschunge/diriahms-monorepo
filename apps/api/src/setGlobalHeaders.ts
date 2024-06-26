import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class GlobalHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // Modify the response object here
      // For example, set the global 'x-app-name' header
      map((data) => {
        context
          .switchToHttp()
          .getResponse()
          .header('apollo-require-preflight', true);
        return data;
      })
    );
  }
}
