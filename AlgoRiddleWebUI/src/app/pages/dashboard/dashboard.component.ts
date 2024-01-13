import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService : AuthService){ }

  login() {
    this.authService.login("myuser", "blabla");
    console.log(this.authService.isAuthenticated);
  }
}
