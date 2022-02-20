import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (typeof window !== "undefined") {
      const currentUser = localStorage.getItem("currentUser");
      const parsedUser = currentUser ? JSON.parse(currentUser) : null;
      if (parsedUser && parsedUser.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${parsedUser.token}`
          }
        });
      }
    }

    return next.handle(request);
  }
}

export const JwtInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
