import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  showNavBar: BehaviorSubject<boolean>;
  constructor() {
    this.showNavBar = new BehaviorSubject(true);
  }

  hide(){
    this.showNavBar.next(false);
  }

  display(){
    this.showNavBar.next(true);
  }
}
