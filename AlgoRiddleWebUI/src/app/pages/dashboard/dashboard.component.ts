import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

import { ProblemService } from '../../services/problem.service';
import { ProblemResponseModel } from '../../models/problemResponseModel';

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
  displayedColumns: string[] = ['number', 'name', 'difficulty', 'id'];
  dataSource = new MatTableDataSource<ProblemResponseModel>;
  isAuthenticated$!: Observable<boolean>;

  userEmail$!: Observable<string | null>; // Non-null assertion operator


  totalProblemsSolved = 0;
  totalProblemsLeft = 0;
  hardProblemsSolved = 0;

  data$: Observable<ProblemResponseModel[]>; // Observable to hold the user's data


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    private problemService: ProblemService) { }


  ngAfterViewInit() {
    this.paginator.pageSize = 10;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.loadProblems();
  }

  async loadProblems() {
    (this.problemService.getAllProblemsPaged()).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    })
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


export interface Problem {
  id: string;
  number: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const PROBLEM_DATA: Problem[] = [
  { id: 'prob_1', number: 1, name: 'Two Sum', difficulty: 'easy' },
  { id: 'prob_2', number: 2, name: 'Add Two Numbers', difficulty: 'medium' },
  { id: 'prob_3', number: 3, name: 'Longest Substring Without Repeating Characters', difficulty: 'medium' },
  { id: 'prob_4', number: 4, name: 'Median of Two Sorted Arrays', difficulty: 'hard' },
  { id: 'prob_5', number: 5, name: 'Longest Palindromic Substring', difficulty: 'medium' },
  { id: 'prob_6', number: 6, name: 'ZigZag Conversion', difficulty: 'medium' },
  { id: 'prob_7', number: 7, name: 'Reverse Integer', difficulty: 'easy' },
  { id: 'prob_8', number: 8, name: 'String to Integer (atoi)', difficulty: 'medium' },
  { id: 'prob_9', number: 9, name: 'Palindrome Number', difficulty: 'easy' },
  { id: 'prob_10', number: 10, name: 'Regular Expression Matching', difficulty: 'hard' },
  { id: 'prob_11', number: 11, name: 'Container With Most Water', difficulty: 'medium' },
  { id: 'prob_12', number: 12, name: 'Integer to Roman', difficulty: 'medium' },
  { id: 'prob_13', number: 13, name: 'Roman to Integer', difficulty: 'easy' },
  { id: 'prob_14', number: 14, name: 'Longest Common Prefix', difficulty: 'easy' },
  { id: 'prob_15', number: 15, name: '3Sum', difficulty: 'medium' },
  { id: 'prob_16', number: 16, name: '3Sum Closest', difficulty: 'medium' },
  { id: 'prob_17', number: 17, name: 'Letter Combinations of a Phone Number', difficulty: 'medium' },
  { id: 'prob_18', number: 18, name: '4Sum', difficulty: 'medium' },
  { id: 'prob_19', number: 19, name: 'Remove Nth Node From End of List', difficulty: 'medium' },
  { id: 'prob_20', number: 20, name: 'Valid Parentheses', difficulty: 'easy' },
];

