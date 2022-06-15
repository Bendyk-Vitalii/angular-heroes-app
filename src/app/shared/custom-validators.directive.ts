import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export function forbiddenValueValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : { forbiddenValue: true };
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
