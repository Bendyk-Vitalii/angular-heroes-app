import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { forbiddenValueValidator } from 'src/app/shared/custom-validators.directive';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  message: string | undefined;

  constructor(public authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        forbiddenValueValidator(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
        ),
      ]),
      login: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        forbiddenValueValidator(/^[a-z]{1,}([A-Z][a-z]{1,}){1,}$/gm),
      ]),
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const user: User = this.form.value;

    this.submitted = true;

    this.authService.register(user);

    this.router.navigate(['/homepage', 'heroselection']);

    this.submitted = false;

    this.form.reset();
  }

  get login() {
    return this.form.get('login')!;
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }
}
