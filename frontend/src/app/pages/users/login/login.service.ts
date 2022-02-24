import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { Router } from "@angular/router";
import { UserService } from  '../../../core/services/user.service';

@Injectable()
export class LoginService {
  constructor(
    public http: HttpClient,
    public router: Router,
    public userService: UserService
  ) {}

  login(email: string, password: string) {
    return this.http
    .post<any>(environment.apiBaseUrl + "/auth/login", {
      email: email,
      password: password
    })
    .pipe(
      map(({data}) => {
          if (data && data.user && data.token) {
            localStorage.setItem("currentUser", JSON.stringify(data));
            this.userService.authSub$.next(true);
          }

          return data;
        })
      );
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.router.navigate(["login"]);
    this.userService.authSub$.next(false);
  }
}
