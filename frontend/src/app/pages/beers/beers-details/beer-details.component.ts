import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { BeersService } from '../beers.service';
import { Beer } from '../models/beer';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit, OnDestroy {

  beerId = "";
  beer$!: Observable<Beer>;
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private beerService: BeersService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.beerId= params.get('id') || "";
      if (!this.beerId) {
        this.toastrService.error('Missing parameter');
        this.router.navigate(['beers']);
        return;
      }
      this.beer$ = this.beerService.getById(this.beerId);
    },
    error => {
      this.toastrService.error(error.message);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
