import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNavbarComponent } from './components/custom-navbar/custom-navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
            CustomNavbarComponent, 
            AngularFireModule,
            AngularFireAuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
