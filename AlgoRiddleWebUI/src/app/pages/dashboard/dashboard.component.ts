import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService : AuthService){ }
  isauth: boolean = this.authService.isAuthenticated;

  login() {
    this.authService.login("b", "L");
    console.log(this.authService.isAuthenticated);
    this.isauth = this.authService.isAuthenticated;
  }
}
