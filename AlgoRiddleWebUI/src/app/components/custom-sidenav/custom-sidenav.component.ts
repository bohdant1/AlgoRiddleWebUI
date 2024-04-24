import { Component,OnInit, Input, computed, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);
  
  userEmail$!: Observable<string | null>; // Non-null assertion operator
  userData$!: Observable<any>; // Observable to hold the user's data

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userEmail$ = this.authService.getCurrentUserEmail();
    this.userData$ = this.userService.getUser();
  }


  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100') 

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },{
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
    }
  ])
}
