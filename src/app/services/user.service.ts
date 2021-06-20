import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL: string = `${environment.base_api_url}/users`;

  constructor(private readonly http: HttpClient) {
  }

  fetchtAll(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
  fetchtById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`).pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
  save(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }
  update(cart: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${cart.id}`, cart);
  }
}
