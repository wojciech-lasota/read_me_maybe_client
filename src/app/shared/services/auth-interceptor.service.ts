import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

interface IHeader {
  [name: string]: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private readonly tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    const headers: IHeader = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({
      setHeaders: {
        ...headers,
      },
    });

    return next.handle(request);
  }
}
