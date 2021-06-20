import {Pipe, PipeTransform} from "@angular/core";
import {User} from "../models/user/user";

@Pipe({name: 'username'})
export class UsernamePipe implements PipeTransform {
  transform(value: User, ...args: any[]): any {
    if (value.name.firstName)
      return `${args[0]} ${value.name.firstName} ${value.name.lastName}`
    return '';
  }

}
