import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { BeersService } from '../beers.service';
import { Beer, BeerListApiData } from '../models/beer';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  minLengthTerm = 3;
  searchBeersCtrl: FormControl = new FormControl();
  beersData!: BeerListApiData | undefined;
  filteredBeers: Beer[] = [];
  errorMsg = "";
  selectedBeer!: Beer | undefined;
  isLoading = false;

  constructor(
    private beerService: BeersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.watchFilter();
  }

  watchFilter() {
    this.searchBeersCtrl.valueChanges.pipe(
      filter(res => {
        return res !== null && res.length >= this.minLengthTerm
      }),
      distinctUntilChanged(),
      debounceTime(500),
      tap(() => {
        this.isLoading = true;
        this.filteredBeers = [];
      }),
      switchMap(async value => {
        const params = new HttpParams()
            .set('select', ['_id', 'name', 'ingredients'].join(','))
            .set('name', value);

          return this.beersData = await this.beerService.getAll(params);
      })
    ).subscribe(data => {
      this.isLoading = false;
      if (!data || data.beers.length == 0) {
        if (this.searchBeersCtrl.value !== "")
          this.errorMsg = 'Beers not found';
        else
          this.errorMsg = '';
        this.filteredBeers = [];
      } else {
        this.errorMsg = "";
        this.filteredBeers = data.beers;
      }
    },
    ({error}) => {
      console.log(error.message);
      this.isLoading = false;
      this.errorMsg = 'Unknown error';
    });
  }

  onSelected($event: MatAutocompleteSelectedEvent ) {
    const beerId = $event.option.value._id;
    this.router.navigate(['beers', beerId]);
  }

  clearSelection() {
    this.errorMsg = "";
    this.selectedBeer = undefined;
    this.filteredBeers = [];
  }

}
