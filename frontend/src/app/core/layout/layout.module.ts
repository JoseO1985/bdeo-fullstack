import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginService } from 'src/app/pages/users/login/login.service';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SidebarComponent],
  imports: [RouterModule, CommonModule, MaterialModule, FlexLayoutModule],
  exports: [LayoutComponent, HeaderComponent, FooterComponent, SidebarComponent],
  providers: [LoginService]
})
export class LayoutModule { }
