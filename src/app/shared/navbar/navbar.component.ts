import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {


  showMenu = false;

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
