import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food-pairing',
  templateUrl: './food-pairing.component.html',
  styleUrls: ['./food-pairing.component.scss']
})
export class FoodPairingComponent implements OnInit {
  @Input() foodPairing: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
