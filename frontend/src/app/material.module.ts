import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

const materialModules = [
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
