import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Product} from "../../models/product";
import {ProductService} from "../product/product.service";

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Observable<Product[]>>{

  constructor(private readonly productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<Product[]>> | Promise<Observable<Product[]>> | Observable<Product[]> {
    return this.productService.filterByPage(1,50);
  }
}
