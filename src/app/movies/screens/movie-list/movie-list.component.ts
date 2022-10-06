import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { PopularMovies } from '../../interfaces/popular.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styles: [
  ]
})
export class MovieListComponent implements OnInit {

  popularMovies!: PopularMovies

  constructor( private moviesService: MoviesService ) { }

  ngOnInit(): void {

    this.moviesService.getPopularMovies()
      .subscribe(movie => this.popularMovies = movie)

  }

}
