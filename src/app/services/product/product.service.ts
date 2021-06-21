import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL: string = `${environment.base_api_url}/products`;

  constructor(private readonly http: HttpClient) {
  }

  fetchtAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL).pipe(shareReplay({bufferSize: 1, refCount: true}));
  }

  fetchtByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}?q=${name}`).pipe(shareReplay({bufferSize: 1, refCount: true}));
  }

  filterByPage(pageNumber: number, entries: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}?_page=${pageNumber}&_limit=${entries}`).pipe(shareReplay({
      bufferSize: 1,
      refCount: true
    }));
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${product.id}`, product);
  }

  delete(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.API_URL}/${productId}`);
  }
}
