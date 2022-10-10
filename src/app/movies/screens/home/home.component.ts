import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {


  goToPopularMovies() {
    this.router.navigateByUrl('/popular')
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
