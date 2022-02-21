import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/layout.component';
import { BeerDetailsComponent } from './beers-details/beer-details.component';
import { BeersListComponent } from './beers-list/beers-list.component';

const routes: Routes = [
    {
      path: "",
      component: LayoutComponent,
      children: [
        { path: ":id", component: BeerDetailsComponent },
        { path: "", component: BeersListComponent }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeersRoutingModule { }
