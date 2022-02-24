import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { generator } from '../../../shared/utils/test-mocks';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let authStubSpy: jest.SpyInstance;

  beforeEach(() => {

    service = new LoginService(
      generator.httpClientServiceStub() as unknown as HttpClient,
      generator.routerStub() as unknown as Router,
      generator.userServiceStub() as unknown as UserService
    );
    delete (global as any).localStorage;
    (global as any).localStorage = {
      setItem: jest.fn()
    } as any;
    authStubSpy = jest.spyOn(service.userService.authSub$, 'next');
  });

  it('should store logged user in local storage and also in the user service', () => {
    delete (global as any).localStorage;
    (global as any).localStorage = {
      setItem: jest.fn()
    } as any;
    const authStubSpy = jest.spyOn(service.userService.authSub$, 'next');
    const spyHttp = jest.spyOn(service.http, 'post').mockReturnValue(of({
      data: {user: {_id: '_id'}, token: 'token'}
    }));

    service.login('email', 'password').subscribe();

    expect(localStorage.setItem).toBeCalledWith("currentUser", JSON.stringify({user: {_id: '_id'}, token: 'token'}));
    expect(authStubSpy).toHaveBeenCalledWith(true);
  });

  it('should not store the user if data is missing', () => {

    jest.spyOn(service.http, 'post').mockReturnValue(of({
      data: null
    }));

    service.login('email', 'password').subscribe();

    expect(localStorage.setItem).not.toBeCalled();
    expect(authStubSpy).not.toBeCalled();
  });


  it('should not store the user if token or user is missing', () => {

    jest.spyOn(service.http, 'post').mockReturnValue(of({
      data: { user: { _id: '_id'}, token: null}
    }));

    service.login('email', 'password').subscribe();

    expect(localStorage.setItem).not.toBeCalled();
    expect(authStubSpy).not.toBeCalled();

    jest.spyOn(service.http, 'post').mockReturnValue(of({
      data: { user: null, token: 'token'}
    }));

    service.login('email', 'password').subscribe();

    expect(localStorage.setItem).not.toBeCalled();
    expect(authStubSpy).not.toBeCalled();
  });
});




