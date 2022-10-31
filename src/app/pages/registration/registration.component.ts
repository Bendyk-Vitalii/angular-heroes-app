import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { GlobalConstants } from './../../shared/global-constants';
import { forbiddenValueValidator } from 'src/app/shared/custom-validators.directive';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public form!: FormGroup;
  public message: string | undefined;
  private isSuccessful = false;
  private isSignUpFailed = false;
  private forbiddenLoginValue = GlobalConstants.forbiddenLoginValue;
  private forbiddenPasswordValue = GlobalConstants.forbiddenPassword;

  public registrationValidation = {
    login: [
      {
        type: 'forbiddenValue',
        message: 'invalid login',
      },
      {
        type: 'minlength',
        message: 'Login should have minimum 8 characters',
      },
    ],
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
      login: [
        '',
        [
          Validators.minLength(8),
          Validators.required,
          forbiddenValueValidator(this.forbiddenLoginValue),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          forbiddenValueValidator(this.forbiddenPasswordValue),
        ],
      ],
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const { login, email, password } = this.form.value;
    // const credentials = { ...login, ...email, ...password };
    console.log(login, email, password);
    this.authService.register({ email, password, login }).subscribe({
      next: (data) => {
        this.message = 'Registration successful';
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.message = err.message;
        this.isSignUpFailed = true;
      },
    });
    this.form.reset();
  }

  get loginInput() {
    return this.form.get('login')!;
  }

  get emailInput() {
    return this.form.get('email')!;
  }

  get passwordInput() {
    return this.form.get('password')!;
  }
}
