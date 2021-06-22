import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user/user";
import {UserRole} from "../enums/user-role";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {SnackBarTypes} from "../enums/snack-bar-types";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private readonly snackBar: MatSnackBar) {
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
      if (a.name)
        return a.name.localeCompare(b.name);
      else return true;
    })
  }

  openSnackBar(msg: string, type: SnackBarTypes): MatSnackBarRef<SimpleSnackBar> {
    switch (type) {
      case SnackBarTypes.ERROR:
        return this.snackBar.open(msg, "", {
          duration: 3000,
          panelClass: 'error-snackbar'
        });
      case SnackBarTypes.SUCCESS:
        return this.snackBar.open(msg, "", {
          duration: 3000,
          panelClass: 'success-snackbar'
        });
      default:
        return this.snackBar.open(msg);
    }
  }
}
