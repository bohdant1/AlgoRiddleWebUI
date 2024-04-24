import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseApi;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(): Observable<any> {
    const url = `${this.baseUrl}users`;
    return this.authService.getRequestWithAuth<any>(url);
  }

}
