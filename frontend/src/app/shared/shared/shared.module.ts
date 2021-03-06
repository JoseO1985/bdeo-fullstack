import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule, FlexLayoutModule],
  declarations: [],
})
export class SharedModule { }
