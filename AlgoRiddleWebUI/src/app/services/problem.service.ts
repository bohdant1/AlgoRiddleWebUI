import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ProblemRequestModel  } from '../models/problemRequestModel';
import { ProblemResponseModel } from '../models/problemResponseModel';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  private readonly baseUrl = `${environment.baseApi}questions`;// Replace with your API base URL

  constructor(private http: HttpClient, private dataService: DataService ) { }

  getProblemById(id: string): Observable<ProblemResponseModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ProblemResponseModel>(url);
  }

  getAllProblemsPaged(page: number = 0, size: number = 10): Observable<Page<ProblemResponseModel>> {
    const url = `${this.baseUrl}/paged?page=${page}&size=${size}`;

    return this.dataService.getRequestWithAuth<Page<ProblemResponseModel>>(url);
  }

  createProblem(problem: ProblemRequestModel): Observable<ProblemResponseModel> {
    const url = `${this.baseUrl}`;
    return this.http.post<ProblemResponseModel>(url, problem);
  }

  updateProblem(id: string, problem: ProblemRequestModel): Observable<ProblemResponseModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<ProblemResponseModel>(url, problem);
  }

  deleteProblem(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
