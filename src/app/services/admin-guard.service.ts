import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CommonService} from "./common.service";
import {UserRole} from "../enums/user-role";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private readonly commonService: CommonService,
              private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.commonService.userSub.getValue().role === UserRole.ADMIN) {
      return true;
    }else{
      this.router.navigate(['/unauthorized']);
      return false;
    }

  }

}
