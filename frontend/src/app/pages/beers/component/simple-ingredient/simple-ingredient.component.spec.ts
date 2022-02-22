import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleIngredientComponent } from './simple-ingredient.component';

describe('SimpleIngredientComponent', () => {
  let component: SimpleIngredientComponent;
  let fixture: ComponentFixture<SimpleIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
