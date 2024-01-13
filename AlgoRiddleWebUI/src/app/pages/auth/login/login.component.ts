import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private navbarService: NavbarService) {

  }
  ngOnDestroy(): void {
    this.navbarService.display();
  }
  ngOnInit(): void {
    this.navbarService.hide();
  }
}
