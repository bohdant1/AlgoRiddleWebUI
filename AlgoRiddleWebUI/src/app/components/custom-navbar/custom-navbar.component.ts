import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    RouterModule
  ],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css'
})
export class CustomNavbarComponent implements OnInit {

  showNavbar: boolean = true;
  isAuthenticated$!: Observable<boolean>;
  title: string = "AlgoRiddleWebUI";
  navBarTitle: string = "AlgoRiddle";
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')

  constructor(private router: Router, private authService: AuthService) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/signup' || val.url == '/login' || val.url == '/passwordreset') {
          this.showNavbar = false;
        }
        else {
          this.showNavbar = true;
        }
      }
    })
  }
  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }
  onLogoutEvent() {
    this.authService.logout();
  }

}
