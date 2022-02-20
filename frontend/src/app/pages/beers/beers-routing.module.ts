import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerDetailsComponent } from './beers-details/beer-details.component';
import { BeersListComponent } from './beers-list/beers-list.component';

const routes: Routes = [
  { path: ":id", component: BeerDetailsComponent },
  { path: "", component: BeersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeersRoutingModule { }
