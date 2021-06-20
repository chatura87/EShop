import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../models/user/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Observable<User>>{

  constructor(private readonly userService:UserService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<User>> | Promise<Observable<User>> | Observable<User> {
    return this.userService.fetchtById(route.params.id);
  }
}
