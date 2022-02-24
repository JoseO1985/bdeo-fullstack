import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BeersService } from '../beers.service';
import { Beer, BeerListApiData } from '../models/beer';

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit {

  beersData!: BeerListApiData | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Beer> = new MatTableDataSource<Beer>();
  totalItems = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private beerService: BeersService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    try {
      const params = new HttpParams()
        .set('page', this.currentPage)
        .set('size', this.pageSize)
        .set('select', ['description', 'name', 'image_url'].join(','));

      this.beersData = await this.beerService.getAll(params);
      if (this.beersData) {
        this.dataSource.data = this.beersData.beers;
        this.dataSource.paginator = this.paginator;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = this.beersData?.totalItems;
        })
      }
    } catch(error: any) {
      this.toastrService.error((error as HttpErrorResponse).message);
    }
  }

  async pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    await this.loadData();
  }

}
