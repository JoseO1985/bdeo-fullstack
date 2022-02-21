import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { BeersService } from 'src/app/pages/beers/beers.service';
import { Beer } from 'src/app/pages/beers/models/beer';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  beers$!: Observable<Beer[]>;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private beerService: BeersService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.userService.isAuthenticated$;
    this.beers$ = this.beerService.getTopTenBeers();
  }
}
