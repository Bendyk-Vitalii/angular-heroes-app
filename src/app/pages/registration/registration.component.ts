import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  message: string | undefined;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, write valid login&password';
      } else if (params['authFailed']) {
        this.message = 'Please< write login & password again';
      }
    });

    this.form = this.authService.registrationFormValidators();
  }

  public submit(): any {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      login: this.form.value.login,
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };
    this.submitted = true;

    this.authService.register(user);

    this.router.navigate(['/homepage', 'heroselection']);

    this.submitted = false;

    this.form.reset();
  }
}
