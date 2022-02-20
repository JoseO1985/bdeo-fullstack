import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from "../models/user";

@Injectable()
export class UserService {
  constructor() {}

  public authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getCurrentUser(): User {
    const currentUser = localStorage.getItem("currentUser")
    return currentUser ? JSON.parse(currentUser) : null;
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.authSub$.asObservable();
  }
}
