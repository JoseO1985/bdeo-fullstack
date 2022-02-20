import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/users/users.module").then((module) => module.UsersModule)
  },
  {
    path: "beers",
   // canActivate: [AuthGuard],
    loadChildren: () => import("./pages/beers/beers.module").then((module) => module.BeersModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
