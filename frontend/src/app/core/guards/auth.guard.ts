﻿import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("currentUser")) {
      this.userService.authSub$.next(true);
      return true;
    }
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}