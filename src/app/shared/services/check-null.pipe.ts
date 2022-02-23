import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkNull',
})
export class CheckNullPipe implements PipeTransform {
  transform(value: string): string | void {
    if (value === 'null') {
      return '0';
    } else {
      return value;
    }
  }
}
