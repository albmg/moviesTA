import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PopularMovies } from './interfaces/popular.interface';
import { Movie } from './interfaces/movie.interface';
import { Actors } from './interfaces/actors.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = environment.baseUrl
  private apiKey: string = environment.apiKey

  constructor(private http: HttpClient) { }

  getPopularMovies( page: number): Observable <PopularMovies> {
    return this.http.get<PopularMovies>(`${ this.baseUrl }/popular?api_key=${ this.apiKey }&language=en-US&page=${page} `)
  }


  getMovieDetail( id: string ): Observable <Movie> {
    return this.http.get<Movie>(`${ this.baseUrl }/${ id }?api_key=${ this.apiKey }&language=en-US`)
  }

  getMovieCast( id: string ): Observable <Actors> {
    return this.http.get<Actors>(`${ this.baseUrl }/${ id }/credits?api_key=${ this.apiKey }&language=en-US`)
  }
}
