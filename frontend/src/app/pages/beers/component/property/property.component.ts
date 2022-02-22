import { Component, Input, OnInit } from '@angular/core';
import { Beer } from '../../models/beer';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() property!: string;
  @Input() value!: string | number;
  @Input() unit!: string | number;

  constructor() { }

  ngOnInit(): void {
  }

}
