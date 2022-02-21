import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit, OnDestroy {

  beerId = "";
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      this.beerId= params.get('id') || "";
      console.log(this.beerId);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
