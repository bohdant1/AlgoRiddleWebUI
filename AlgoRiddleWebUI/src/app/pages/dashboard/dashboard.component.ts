import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { ProblemService } from '../../services/problem.service';
import { ProblemResponseModel } from '../../models/problemResponseModel';
import { Page } from '../../models/page';
import { catchError, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  errorMessage!: string;
  total!: number;

  pageSizes = [10, 5, 20];


  data: ProblemResponseModel[] = [];
  dataSource = new MatTableDataSource<ProblemResponseModel>();

  
  displayedColumns: string[] = ['number', 'name', 'difficulty', 'id'];
  isAuthenticated$!: Observable<boolean>;

  userEmail$!: Observable<string | null>; // Non-null assertion operator


  totalProblemsSolved = 0;
  totalProblemsLeft = 0;
  hardProblemsSolved = 0;

  isLoading = false;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    private problemService: ProblemService) { }

  getTableData$(pageNumber: number, pageSize: number) {
    return this.problemService.getAllProblemsPaged(pageNumber, pageSize);
  }  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.getTableData$(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }),
        map((data) => {
          this.isLoading = false;
          if (data === null) {
            return [];
          }

          this.total = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: ProblemResponseModel[]) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
      });
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  getDifficultyClass(difficulty: 'easy' | 'medium' | 'hard'): string {
    switch (difficulty) {
      case 'easy':
        return 'easy-difficulty';
      case 'medium':
        return 'medium-difficulty';
      case 'hard':
        return 'hard-difficulty';
      default:
        return '';
    }
  }

  onOpenClick(value: string): void {
    this.router.navigateByUrl(`/problem/${value}`);
  }
}
