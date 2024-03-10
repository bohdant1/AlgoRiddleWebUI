import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseApi;

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}users?email=${email}`;
    return this.http.get<any>(url);
  }

}
