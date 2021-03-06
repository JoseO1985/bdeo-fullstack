import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { LoginService } from './login/login.service';
import { BeersService } from '../beers/beers.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UsersRoutingModule
  ],
  providers: [
    LoginService,
    BeersService
  ]
})
export class UsersModule { }
