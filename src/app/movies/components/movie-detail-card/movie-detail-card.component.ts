import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-detail-card',
  templateUrl: './movie-detail-card.component.html',
  styles: [
  ]
})
export class MovieDetailCardComponent implements OnInit {


  movie!: Movie

  constructor() { }

  ngOnInit(): void {

  }

}
