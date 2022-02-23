import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(private router: Router, public auth: AuthService) {}

  isAuthenticatedUser = this.auth.isAuthenticated();
  public ngOnInit(): void {}

  public logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['registration']);
  }
}
