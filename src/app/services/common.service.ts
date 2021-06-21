import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user/user";
import {UserRole} from "../enums/user-role";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  toggleStatusSub = new BehaviorSubject<boolean>(false);
  toggleStatus$ = this.toggleStatusSub.asObservable();
  userSub = new BehaviorSubject<User>({
    avatar: "",
    email: "",
    id: 0,
    name: {firstName: '', lastName: ''},
    orders: [],
    phone: "",
    role: UserRole.CUSTOMER
  });
  user$ = this.userSub.asObservable();


  sortByName(list: any[]) {
    return list.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
  }
}
