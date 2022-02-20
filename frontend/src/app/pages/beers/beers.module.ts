import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeersRoutingModule } from './beers-routing.module';
import { BeersListComponent } from './beers-list/beers-list.component';
import { BeerDetailsComponent } from './beers-details/beer-details.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { BeersService } from './beers.service';


@NgModule({
  declarations: [
    BeersListComponent,
    BeerDetailsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    BeersRoutingModule
  ],
  providers: [
    BeersService
  ]
})
export class BeersModule { }
