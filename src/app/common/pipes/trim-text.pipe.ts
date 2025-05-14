import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(
    value: string, 
    limit: number = 100, 
    suffix: string = '...'
  ): unknown {
    if (!value) return '';
    
    if (value.length <= limit) return value;

    return value.slice(0, limit) + suffix;
  }
}