import {ActivatedRoute, Router, Params} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;
  message: string | undefined;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, write login&password';
      } else if (params['authFailed']) {
        this.message = 'Please< write login & password again';
      }
    });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(5)
        // Validators.pattern(/^[0-9]+(!@#$%^&*)/)
      ]),
    });

  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(['/homepage']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
