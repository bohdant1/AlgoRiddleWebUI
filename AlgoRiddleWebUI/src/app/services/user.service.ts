import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.baseApi;

  constructor(private http: HttpClient, private dataService: DataService) { }

  getUser(): Observable<any> {
    const url = `${this.baseUrl}users`;
    return this.dataService.getRequestWithAuth<any>(url);
  }

}
