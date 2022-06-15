import { ServerResponse } from './../interfaces';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<ServerResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<ServerResponse>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth!.token!,
        },
      });
    }
    return next.handle(req).pipe(
      tap(() => {}),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['homepage'], {
            queryParams: {
              authFailed: true,
            },
          });
        }

        return throwError(error);
      })
    );
  }
}
