import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { IUser } from '../../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}
  get token(): string | null {
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  loginSubmit(email: string, password: string): void | Promise<boolean> {
    const userInfo = JSON.parse(localStorage.getItem('user-data') as string);
    const expDate = new Date(<string>localStorage.getItem('fb-token-exp'));
    const expression =
      userInfo.email === email && userInfo.password === password;
    if (expression) {
      return this.router.navigate(['/homepage', 'heroselection']);
    }
  }

  register(user: IUser): void {
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
        .map(() => base[(Math.random() * base.length) | 0])
        .join('');
    };

    localStorage.setItem('fb-token', tokenGenerator(base, 12));
    localStorage.setItem('fb-token-exp', expDate.toString());
    localStorage.setItem('user-data', JSON.stringify(user));
  }

  logout(): void {
    return;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}
