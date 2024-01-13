import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            RouterOutlet,
            MatToolbarModule,
            MatButtonModule,
            MatIconModule,
            MatSidenavModule,
            CustomSidenavComponent,
            AngularFireModule,
            AngularFireAuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title : string = "AlgoRiddleWebUI";
  navBarTitle : string = "AlgoRiddle"; 
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px')
}
