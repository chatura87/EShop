import {getTestBed, TestBed} from '@angular/core/testing';

import {eShopInterceptor} from './e-shop-interceptor.service';
import {ProductService} from "./product/product.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";

let injector: TestBed;
let httpClient: HttpClient;
let service: ProductService;
let httpMock: HttpTestingController;
const API_URL = 'http://localhost:8080';
let originalTimeout: number;
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      ProductService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: eShopInterceptor,
        multi: true,
      },
    ],
  });


  injector = getTestBed();
  httpClient = TestBed.inject(HttpClient);
  service = TestBed.inject(ProductService);
  httpMock = TestBed.inject(HttpTestingController);


});

it('should fetch result', (done) => {
  service.fetchAll().pipe(take(1)).subscribe(response => {
    expect(response).toBeTruthy();
    done();
  });
  const httpRequest = httpMock.expectOne(`${API_URL}/products`);

  expect(httpRequest.request.headers.has('Accept')).toEqual(true);
  expect(httpRequest.request.headers.has('content-type')).toEqual(true);
});

