import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'igv'
})
export class IgvPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
