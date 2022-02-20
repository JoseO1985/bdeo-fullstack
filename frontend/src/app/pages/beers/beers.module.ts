import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeersRoutingModule } from './beers-routing.module';
import { BeersListComponent } from './beers-list/beers-list.component';
import { BeerDetailsComponent } from './beers-details/beer-details.component';


@NgModule({
  declarations: [
    BeersListComponent,
    BeerDetailsComponent
  ],
  imports: [
    CommonModule,
    BeersRoutingModule
  ]
})
export class BeersModule { }
