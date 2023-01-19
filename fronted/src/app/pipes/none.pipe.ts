import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'none'
})
export class NonePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    const res = value ? value : '-';
    return res;
  }

}
