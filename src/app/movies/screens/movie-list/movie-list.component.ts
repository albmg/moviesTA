import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { PopularMovies } from '../../interfaces/popular.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styles: [
  ]
})
export class MovieListComponent implements OnInit {

  popularMovies!: PopularMovies

  page: number = 1

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {

    this.moviesService.getPopularMovies(this.page)
      .subscribe(movie => this.popularMovies = movie)

  }

  setPage( event: PageEvent) {
    console.log(event)
    this.page = event.pageIndex + 1

    this.moviesService.getPopularMovies(this.page)
      .subscribe(movie => this.popularMovies = movie)
  }

}
