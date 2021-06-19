import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  API_URL: string = `${environment.base_api_url}/carts`;

  constructor(private readonly http: HttpClient) { }

  fetchtAll(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.API_URL).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
  fetchtByUserId(id: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.API_URL}/${id}`).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
  save(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.API_URL, cart);
  }
  update(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.API_URL}/${cart.id}`, cart);
  }
}
