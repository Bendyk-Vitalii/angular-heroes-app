import { environment } from './../../../environments/environment';
import { User } from './../../shared/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, Subject, throwError, catchError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  loginFormValidators(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
        ),
      ]),
    });
  }

  registrationFormValidators(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
        Validators.pattern(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
        ),
      ]),
      login: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(
          /^[a-z]{1,}([A-Z][a-z]{1,}){1,}$|^[a-z]{1,}(-[a-z]{1,}){1,}$/gm
        ),
      ]),
    });
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

  loginSubmit(form: any, submitted: any, authService: any, router: any) {
    if (form.invalid) {
      return;
    }
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    const expression = new Date() < expDate;
    if (expression) {
      return router.navigate(['/homepage/heroselection']);
    }
    submitted = true;

    const user: User = {
      email: form.value.email,
      password: form.value.password,
      returnSecureToken: true,
    };

    authService.login(user).subscribe(() => {
      form.reset();
      router.navigate(['/homepage']);
      submitted = false;
    });
  }

  register(user: User): void {
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

    const tokenGenerator = (base: string[], len: number) => {
      return [...Array(len)]
        .map((i) => base[(Math.random() * base.length) | 0])
        .join('');
    };

    localStorage.setItem('fb-token', tokenGenerator(base, 12));
    localStorage.setItem('fb-token-exp', expDate.toString());
    localStorage.setItem('user-data', JSON.stringify(user));
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
