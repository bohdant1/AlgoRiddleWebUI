import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

import { ProblemService } from '../../services/problem.service';
import { ProblemResponseModel } from '../../models/problemResponseModel';
import { Page } from '../../models/page';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  problems: ProblemResponseModel[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;

  
  displayedColumns: string[] = ['number', 'name', 'difficulty', 'id'];
  dataSource = new MatTableDataSource<ProblemResponseModel>(this.problems);
  isAuthenticated$!: Observable<boolean>;

  userEmail$!: Observable<string | null>; // Non-null assertion operator


  totalProblemsSolved = 0;
  totalProblemsLeft = 0;
  hardProblemsSolved = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    private problemService: ProblemService) { }


  ngAfterViewInit() {
    this.paginator.pageSize = this.pageSize;
    this.dataSource.paginator = this.paginator;
    this.loadProblems(this.pageNumber, this.pageSize);
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    // this.loadProblems(this.pageNumber, this.pageSize);
  }

  async loadProblems(page: number = 0, size: number = 10) {
    this.problemService.getAllProblemsPaged(page,size).subscribe({
      next: (res) => {
        this.problems = res.content;
        this.dataSource = new MatTableDataSource<ProblemResponseModel>(this.problems);
      },
      error: (err) => console.log(err),
    });
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

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    this.loadProblems(pageIndex, 10);
  }
}
