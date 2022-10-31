import { AuthServerResponse } from './interface/auth.interface';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, tap, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserModel } from './user.model';
import { UserCredentials } from './../../interfaces';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const AUTH_API = GlobalConstants.authApi;

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user = new BehaviorSubject<UserModel>(null!);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthServerResponse>(AUTH_API + 'login', credentials, httpOptions)
      .pipe(
        catchError(this.handleError),
        tap((res: AuthServerResponse) =>
          this.handleAuthentication(res.access_token)
        )
      );
  }

  register({ login, email, password }: UserCredentials): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        login,
        email,
        password,
      },
      httpOptions
    );
  }

  public handleAuthentication(access_token: string) {
    const { email, exp, iat, id } =
      this.jwtHelperService.decodeToken(access_token);
    const expirationDate = new Date(new Date().getTime() + exp);
    const user = new UserModel(email, id, access_token, expirationDate, iat);
    this.user.next(user);
    this.autoLogout(exp * 10000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userDataJson = localStorage.getItem('userData');
    if (!userDataJson) {
      return;
    }
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userDataJson);

    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    this.user.next(loadedUser);
    const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  public logout() {
    this.user.next(null!);
    this.router.navigate(['login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'CONFLICT':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
// public error$: Subject<string> = new Subject<string>();

// constructor(private http: HttpClient) {}

// login(credentials: IUser): Observable<any> {
//   return this.http.post(
//     'http://localhost:3000/api/auth/login',
//     {
//       name: credentials.name,
//       email: credentials.email,
//       password: credentials.password,
//     },
//     httpOptions
//   );
// }

// register(credentials: IUser): Observable<any> {
//   return this.http
//     .post(
//       'http://localhost:3000/api/auth/login',
//       {
//         username: credentials.name,
//         email: credentials.email,
//         password: credentials.password,
//       },
//       httpOptions
//     )
//     .pipe(
//       catchError(this.handleError),
//       tap(() => console.log(Response))
//     );
// }

// // async updateUserData(
// //   {name, email, password }: IUser,
// //   registrationName?: string
// // ) {
// //   const data: IUser = {
// //     uid,
// //     email,
// //     displayName: registrationName ? registrationName : displayName,
// //     photoURL,
// //     emailVerified: emailVerified,
// //   };
// //   const headers = { 'content-type': 'application/json' };
// //   const body = JSON.stringify(data);
// //   return await this.http
// //     .post<IUser>(
// //       'http://localhost:3000/api/auth/login',
// //       { user: body },
// //       { headers }
// //     )
// //     .toPromise()
// //     .then((result) => {
// //       return result;
// //     })
// //     .catch((error) => {
// //       throw error;
// //     });
// // }

// get token(): string | null {
//   const expDate = new Date(<string>localStorage.getItem('token-exp'));
//   if (new Date() > expDate) {
//     this.logout();
//     return null;
//   }
//   return localStorage.getItem('auth-token');
// }

// loginSubmit(user: IUser): Observable<any> {
//   //user.returnSecureToken = true;
//   return this.http
//     .post('http://localhost:3000/api/auth/login', user)
//     .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
// }

// logout() {
//   this.setToken(null);
// }

// isAuthenticated(): boolean {
//   return !!this.token;
// }
// ///////////////////////
// ///////////////////////////
// private handleAuthentication(
//   email: string,
//   userId: string,
//   token: string,
//   expiresIn: number
// ) {
//   const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
//   //const user = new IUser(email, userId, token, expirationDate);
//   // this.user.next(user);
//   this.logout();

//   //localStorage.setItem('userData', JSON.stringify(user));
// }

// private handleError(error: HttpErrorResponse) {
//   const { message } = error.error.error;
//   console.dir(error);
//   switch (message) {
//     case 'INVALID_EMAIL':
//       this.error$.next('Invalid email');
//       break;
//     case 'INVALID_PASSWORD':
//       this.error$.next('Invalid password');
//       break;
//     case 'EMAIL_NOT_FOUND':
//       this.error$.next('This email not found');
//       break;
//   }
//   return throwError(error);
// }

// private setToken(response: any) {
//   if (response) {
//     const expDate = new Date(
//       new Date().getTime() + +response.expiresIn * 1000
//     );
//     localStorage.setItem('auth-token', response.idToken);
//     localStorage.setItem('token-exp', expDate.toString());
//   } else {
//     localStorage.clear();
//   }
// }
