import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Beer } from './models/beer';

@Injectable()
export class BeersService {
  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<Beer>(environment.apiBaseUrl + "/beers");
  }
}
