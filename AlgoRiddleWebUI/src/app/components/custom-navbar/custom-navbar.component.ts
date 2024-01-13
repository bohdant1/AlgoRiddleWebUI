import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { RouterModule } from '@angular/router';


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
export class CustomNavbarComponent {
  showNavbar: boolean = true;
  title : string = "AlgoRiddleWebUI";
  navBarTitle : string = "AlgoRiddle"; 
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        if(val.url == '/signup' || val.url == '/login'){
          this.showNavbar = false;
        }
        else {
          this.showNavbar = true;
        } 
      }
    })
  }

}
