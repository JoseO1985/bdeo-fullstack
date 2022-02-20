import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BeersService } from '../beers.service';
import { Beer } from '../models/beer';

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {

  beers$!: Observable<Beer>;

  constructor(
    private beerService: BeersService
  ) { }

  ngOnInit(): void {
    this.beers$ = this.beerService.getAll();
  }

}
