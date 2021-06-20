import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'limitChars'})
export class LimitChars implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    if (value.length > args[0]) {
      return `${value.substr(0, args[0])}...`;
    }
    return value;
  }

}
