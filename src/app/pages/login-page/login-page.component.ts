import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  message: string | undefined;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, write login & password';
      } else if (params['authFailed']) {
        this.message = 'Please, write login & password again';
      }
    });

    this.form = this.authService.loginFormValidators();
  }

  submit(): any {
    this.authService.loginSubmit(
      this.form,
      this.submitted,
      this.authService,
      this.router
    );
  }
}
