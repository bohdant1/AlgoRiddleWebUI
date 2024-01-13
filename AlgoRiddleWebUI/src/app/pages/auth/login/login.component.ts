import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  constructor() {

  }
  // ngOnDestroy(): void {
  //   this.navbarService.display();
  // }
  // ngOnInit(): void {
  //   this.navbarService.hide();
  //   console.log("Login ngOnIt "+this.navbarService.showNavBar.value);
  // }
}
