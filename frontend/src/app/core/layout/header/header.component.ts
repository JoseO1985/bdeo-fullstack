import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from 'src/app/pages/users/login/login.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  title = 'Beers Catalog';
  isAuthenticated$!: Observable<boolean>;
  user!: User;

  constructor(
    public router: Router,
    private userService: UserService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
    this.user = this.userService.getCurrentUser();
  }

  logout() {
    this.loginService.logout();
  }
}
