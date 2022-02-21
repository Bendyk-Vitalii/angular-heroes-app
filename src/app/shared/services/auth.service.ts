import { environment } from './../../../environments/environment';
import { User } from './../../shared/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class AuthService {

  public error$: Subject<string> = new Subject<string>();
  Router: any;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }


  register(form: FormGroup, user: User, submitted: boolean = false): void {

    const expDate = new Date(new Date().getTime() + 25000);

    const allCapsAlpha = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const allLowerAlpha = [...'abcdefghijklmnopqrstuvwxyz'];
    const allUniqueChars = [..."~!@#$%^&*()_+-=[]{}|;:'"];
    const allNumbers = [...'0123456789'];

    const base = [
      ...allCapsAlpha,
      ...allNumbers,
      ...allLowerAlpha,
      ...allUniqueChars,
    ];

    submitted = true;

    const tokenGenerator = (base: string[], len: number) => {
      return [...Array(len)]
        .map((i) => base[(Math.random() * base.length) | 0])
        .join('');
    };

    localStorage.setItem('fb-token', tokenGenerator(base, 12));
    localStorage.setItem('fb-token-exp', expDate.toString());
    localStorage.setItem('user-data', JSON.stringify(user))
    form.reset();
    this.router.navigate(['/homepage']);
    submitted = false;
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('This email not found');
        break;
    }
    return throwError(error);
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
