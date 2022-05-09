import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export function forbiddenValueValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenValue: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true,
    },
  ],
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenValue') forbiddenValue = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenValue
      ? forbiddenValueValidator(new RegExp(this.forbiddenValue, 'i'))(control)
      : null;
  }
}

//         Validators.minLength(5),
//         Validators.required,
//         Validators.pattern(
//           /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
//         ),
//       ]),
//       login: new FormControl('', [
//         Validators.minLength(8),
//         Validators.required,
//         Validators.pattern(
//           /^[a-z]{1,}([A-Z][a-z]{1,}){1,}$|^[a-z]{1,}(-[a-z]{1,}){1,}$/gm
//         ),
//       ]),
//     });
//   }
// }

// public loginFormValidators(control: FormControl): {
//   [key: string]: boolean;
// } | null {
//   const regString =
//     '/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g';
//   const passValid =
//     control.value && new RegExp(regString).test(control.value);
//   if (!passValid) {
//     {
//       return { password: true };
//     }
//   }
//   return null;
// }

//   registrationFormValidators(): FormGroup {
//     return new FormGroup({
//       email: new FormControl('', [Validators.required, Validators.email]),
//       password: new FormControl('', [
//         Validators.minLength(5),
//         Validators.required,
//         Validators.pattern(
//           /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,}/g
//         ),
//       ]),
//       login: new FormControl('', [
//         Validators.minLength(8),
//         Validators.required,
//         Validators.pattern(
//           /^[a-z]{1,}([A-Z][a-z]{1,}){1,}$|^[a-z]{1,}(-[a-z]{1,}){1,}$/gm
//         ),
//       ]),
//     });
//   }
// }
