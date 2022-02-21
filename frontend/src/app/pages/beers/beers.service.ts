import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { map, take } from 'rxjs';
import { ApiResponse } from '../../core/models/response';
import { BeerApiData } from './models/beer';

@Injectable()
export class BeersService {
  constructor(
    private http: HttpClient
  ) {}

  getAll(params: HttpParams) {
    return this.http.get<ApiResponse>(environment.apiBaseUrl + '/beers', {params}).pipe(
        map(({data}) => data as BeerApiData),
        take(1)
      ).toPromise();
  }


}
