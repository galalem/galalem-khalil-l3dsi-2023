import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { EMPTY, from, lastValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const SKIP_HEADER = "Skip-Interceptor";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has(SKIP_HEADER)){
      return next.handle(request.clone({
        headers: request.headers.delete(SKIP_HEADER)
      }));
    }
    return from(this.handle(request, next));
  }

  async handle(request: HttpRequest<any>, next: HttpHandler) {
    let token = await this.auth.token;
    if (!token)
      return await lastValueFrom(EMPTY);

    return await lastValueFrom(next.handle(request.clone({
      headers: request.headers.set("authorization", "Bearer " + token)
    })));
  }
}

export const KEYCLOAK_AUTH_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi:true
} 
