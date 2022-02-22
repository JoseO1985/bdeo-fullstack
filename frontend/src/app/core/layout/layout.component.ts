import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
  }
}
