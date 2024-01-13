import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';

import { NavbarService } from '../../services/navbar.service';
import { Subscription } from 'rxjs';


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
            ],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css'
})
export class CustomNavbarComponent implements OnDestroy{
  showNavbar: boolean = true;
  subsciption: Subscription;
  title : string = "AlgoRiddleWebUI";
  navBarTitle : string = "AlgoRiddle"; 
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')

  constructor(private navbarService: NavbarService){
    this.subsciption = this.navbarService.showNavBar.subscribe((value) => {
      this.showNavbar = value;
    })
  }
  

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }
}
