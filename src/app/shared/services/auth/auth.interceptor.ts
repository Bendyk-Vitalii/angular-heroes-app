import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { ServerResponse } from '../../interfaces';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private auth: AuthService, private router: Router) {}
  // intercept(
  //   req: HttpRequest<ServerResponse>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<ServerResponse>> {
  //   if (this.auth.isAuthenticated()) {
  //     req = req.clone({
  //       setParams: {
  //         auth: this.auth!.token!,
  //       },
  //     });
  //   }
  //   return next.handle(req).pipe(
  //     tap(() => {}),
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         this.auth.logout();
  //         this.router.navigate(['homepage'], {
  //           queryParams: {
  //             authFailed: true,
  //           },
  //         });
  //       }
  //       return throwError(error);
  //     })
  //   );
  // }
  constructor(private token: TokenStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, token),
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
