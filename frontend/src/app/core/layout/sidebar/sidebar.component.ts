import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { BeersService } from 'src/app/pages/beers/beers.service';
import { Beer } from 'src/app/pages/beers/models/beer';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
  beers$!: Observable<Beer[]>;
  constructor(
    private beerService: BeersService
  ) {}

  ngOnInit(): void {
    this.beers$ = this.beerService.getTopTenBeers();
  }
}
