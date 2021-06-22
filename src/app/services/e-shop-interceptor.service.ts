import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";
import {CommonService} from "./common.service";
import {SnackBarTypes} from "../enums/snack-bar-types";


@Injectable()
export class eShopInterceptor implements HttpInterceptor {

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly commonService: CommonService) {
  }

  cache: Map<string, HttpResponse<any>> = new Map();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();

    if (!request.headers.has('content-type')) {
      request = request.clone({headers: request.headers.set('content-type', 'application/json')});
    }
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse: HttpResponse<any> | undefined = this.cache.get(request.urlWithParams);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }
    return this.getResponseFromCache(request, next);
  }

  private getResponseFromCache(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      tap((state: HttpEvent<any>) => {
        if (state instanceof HttpResponse) {
          this.cache.set(request.urlWithParams, state.clone());
          this.spinner.hide();
        }
        return state;
      }), catchError(error => {
        this.spinner.hide();
        this.commonService.openSnackBar('Something went wrong', SnackBarTypes.ERROR);
        return throwError(error);
      }))
  }
}
