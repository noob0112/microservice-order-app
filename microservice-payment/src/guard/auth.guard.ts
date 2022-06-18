import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getArgs()[0].Authorization !== '12345') {
      return false;
      // throw new Error('UnauthorizedException');
    }
    return true;
  }
}
