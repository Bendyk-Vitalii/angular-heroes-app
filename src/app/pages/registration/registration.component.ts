import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  message: string | undefined;

  constructor(public auth: AuthService, private route: ActivatedRoute) {}



  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, write valid login&password';
      } else if (params['authFailed']) {
        this.message = 'Please< write login & password again';
      }
    });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
        ),
      ]),
      login: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(/^[a-z]{1,}([A-Z][a-z]{1,}){1,}$|^[a-z]{1,}(-[a-z]{1,}){1,}$/gm),
      ]),
    });
  }

  submit(): any {

    if (this.form.invalid) {
      return;
    }

    const user: User = {
      login: this.form.value.login,
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };

    this.auth.register(this.form, user, this.submitted);
  }
}

