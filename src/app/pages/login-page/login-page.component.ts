import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenValueValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public message!: string;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        forbiddenValueValidator(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
        ),
      ]),
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  public submit(): void {
    this.authService.loginSubmit(
      this.form.value.email,
      this.form.value.password,
      this.router
    );
    this.message = 'Please, write login & password again';
    this.form.reset();
  }
}
