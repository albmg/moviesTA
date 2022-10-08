import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';
import { Result } from '../../interfaces/popular.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styles: [
  ]
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: Result
  @Input() movies!: Movie


  constructor() { }

  ngOnInit(): void {
  }

}
