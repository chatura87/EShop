import {inject, TestBed} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import {ProductService} from './product.service';
import {Product} from "../../models/product";

describe('ProductService', () => {
  let productService: ProductService;
  let httpTestingController: HttpTestingController;
  let baseUrl = "http://localhost:8080/products";
  let product: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    httpTestingController = TestBed.get(HttpTestingController);
    product = {
      id: 1,
      name: "John",
      description: "test description",
      discount: 30,
      defaultImage: "test image",
      images: ['a', 'b'],
      price: 300
    };
  });
  beforeEach(inject(
    [ProductService],
    (service: ProductService) => {
      productService = service;
    }
  ));

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('fetchAll() should return value from observable',
    async (done: DoneFn) => {
      productService.fetchtAll().subscribe(value => {
        expect(value).toBeGreaterThan(0);
        done();
      });
    });
});
