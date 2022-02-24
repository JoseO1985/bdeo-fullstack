import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { generator } from '../../../shared/utils/test-mocks';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ LoginComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: LoginService, useFactory: generator.loginServiceStub() },
        { provide: Router, useFactory: generator.routerStub() },
        { provide: ToastrService, useFactory: generator.toastrServiceStub() },
      ]
    }).overrideComponent(LoginComponent, {

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call toast service with an error in case of invalid form', () => {
    component.login();
    expect(component.toastrService.error).toHaveBeenCalledWith("Invalid credentials");
  });

  it('should navigate to / route if credentials are correct', () => {
    (component.loginForm as any) = {
      valid: true,
      controls: {
        email: {
          value: ''
        },
        password: {
          value: ''
        }
      }
    }
    component.loginService.login = jest.fn().mockReturnValue(of({
      user: {_id: '_id'},
      toke: 'token'
    }));
    component.login();
    expect(component.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call toast service with an error if login service throw an exception', () => {
    (component.loginForm as any) = {
      valid: true,
      controls: {
        email: {
          value: ''
        },
        password: {
          value: ''
        }
      }
    }
    component.loginService.login = jest.fn().mockReturnValue(throwError('unhandled error'));

    component.login();
    expect(component.toastrService.error).toHaveBeenCalledWith('unhandled error');
  });
});
