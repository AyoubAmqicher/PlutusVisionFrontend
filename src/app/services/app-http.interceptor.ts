import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { tap, Observable, throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService,private router : Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoadingSpinner();
    // if (token) {
    //     request = request.clone({
    //         setHeaders: {
    //             Authorization: `Bearer ${token}`
    //         },
    //     });
    // }

    request = request.clone()

    return next.handle(request).pipe(
        tap(evt => {
            if (evt instanceof HttpResponse) {
                if(evt != null) {
                      // here we are hide the loader flag
                      this.loadingService.hideLoadingSpinner();
                 }  
            }
        }),
        catchError((error: HttpErrorResponse) => this.handleErrorRes(error)));
}

private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    this.loadingService.hideLoadingSpinner();
    if (error.status === 401) {
        this.router.navigateByUrl("/login", {replaceUrl: true});
    }
    return throwError(() => error);
}
}
