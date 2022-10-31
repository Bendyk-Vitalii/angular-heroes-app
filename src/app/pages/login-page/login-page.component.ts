import { IUser } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { GlobalConstants } from './../../shared/global-constants';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { forbiddenValueValidator } from 'src/app/shared/custom-validators.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public message!: string;

  private forbiddenPassword = GlobalConstants.forbiddenPassword;

  public signInValidation = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long',
      },
      {
        type: 'forbiddenValue',
        message: `Password should have at least 1 uppercase letter, 1 lowercase letter,
      1 number and at least one of symbols !@#$%^&*`,
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          forbiddenValueValidator(this.forbiddenPassword),
        ],
      ],
    });
  }

  get emailInput() {
    return this.form.get('email')!;
  }

  get passwordInput() {
    return this.form.get('password')!;
  }

  public submit(): void {
    this.authService
      .login({
        email: this.emailInput.value,
        password: this.passwordInput.value,
      })
      .subscribe({
        next: (authData) => {
          console.dir(authData);
          this.router.navigate(['homepage/heroselection']);
        },
        error: (errorMessage) => {
          this.message = errorMessage;
          this.form.reset();
        },
      });
  }
}
