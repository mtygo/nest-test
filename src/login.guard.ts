import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}