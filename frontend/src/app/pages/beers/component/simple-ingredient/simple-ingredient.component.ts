import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-ingredient',
  templateUrl: './simple-ingredient.component.html',
  styleUrls: ['./simple-ingredient.component.scss']
})
export class SimpleIngredientComponent implements OnInit {

  @Input() type = "";
  @Input() name = "";

  constructor() { }

  ngOnInit(): void {
  }

}
