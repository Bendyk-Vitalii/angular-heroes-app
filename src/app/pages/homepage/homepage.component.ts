import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  constructor(private router: Router, public authService: AuthService) {}

  public isAuthenticatedUser = this.authService.isAuthenticated();

  public logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
