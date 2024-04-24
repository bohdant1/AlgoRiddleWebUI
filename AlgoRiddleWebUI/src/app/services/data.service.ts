import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { }

  // Generic method to make HTTP request with authorization headers
  getRequestWithAuth<T>(
    url: string
  ): Observable<T> {
    return this.afAuth.idToken.pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<T>(url, { headers });
      })
    );
  }
}
