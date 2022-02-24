// tslint:disable
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeersListComponent } from './beers-list.component';
import { BeersService } from '../beers.service';
import { ToastrService } from 'ngx-toastr';
import { generator } from '../../../shared/utils/test-mocks';
import { By } from '@angular/platform-browser';


describe('BeersListComponent', () => {
  let fixture: any;
  let component: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        BeersListComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: BeersService, useFactory: generator.beerServiceStub() },
        { provide: ToastrService, useFactory: generator.toastrServiceStub() },
      ]
    }).overrideComponent(BeersListComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(BeersListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    //jest.useFakeTimers()
  });

  afterEach(() => {
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource and paginator', async () => {

    component.beerService.getAll = jest.fn().mockResolvedValue({
      beers: [{
        name: 'beer'
      }],
      totalItems: 1
    });
    await component.loadData();

    expect(component.dataSource.data).toBe(component.beersData.beers);
    expect(component.dataSource.paginator).toBe(component.paginator);

  /*  fixture.detectChanges();
    jest.runAllTimers();
    expect(component.paginator.pageIndex).toBe(component.currentPage);
    expect(component.paginator.length).toBe(component.beersData.totalItems);*/
  });

  it('should not initialize dataSource paginator', async () => {

    component.beerService.getAll = jest.fn().mockResolvedValue(null);
    await component.loadData();

    expect(component.dataSource.paginator).toBeUndefined();

  });

  it('should call toastrService error', async () => {
    component.beerService.getAll = jest.fn().mockRejectedValue({
      message: 'error'
    });
    const spyToast = jest.spyOn(component.toastrService, 'error');
    await component.loadData();

    expect(spyToast).toHaveBeenCalled();
  });
});

