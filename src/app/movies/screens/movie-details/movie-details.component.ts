import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styles: [
  ]
})
export class MovieDetailsComponent implements OnInit {

  movieDetails!: Movie

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.moviesService.getMovieDetail(id))
      )
      .subscribe( movie => this.movieDetails = movie )
  }

}
