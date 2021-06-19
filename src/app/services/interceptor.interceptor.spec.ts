import {getTestBed, TestBed} from '@angular/core/testing';

import {eShopInterceptor} from './e-shop-interceptor.service';
import {ProductService} from "./product.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

let injector: TestBed;
let service: ProductService;
let httpMock: HttpTestingController;
const API_URL = 'http://localhost:8080'

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
  service = TestBed.inject(ProductService);
  httpMock = TestBed.inject(HttpTestingController);
});

