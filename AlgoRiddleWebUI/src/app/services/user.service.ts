import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseApi;

  constructor(private http: HttpClient) { }

  getUserByEmail(): Observable<any> {
    const url = `${this.baseUrl}users`;
    return this.http.get<any>(url);
  }

}
