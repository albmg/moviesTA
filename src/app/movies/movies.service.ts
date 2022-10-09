import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PopularMovies } from './interfaces/popular.interface';
import { Movie } from './interfaces/movie.interface';
import { Actors } from './interfaces/actors.interface';
import { Search } from './interfaces/search.interface';
import { Result } from './interfaces/search.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = environment.baseUrl
  private apiKey: string = environment.apiKey

  queryResultsFromApi!: Result[]

  constructor(private http: HttpClient) { }

  getPopularMovies( page: number): Observable <PopularMovies> {
    return this.http.get<PopularMovies>(`${ this.baseUrl }/movie/popular?api_key=${ this.apiKey }&language=en-US&page=${page} `)
  }


  getMovieDetail( id: string ): Observable <Movie> {
    return this.http.get<Movie>(`${ this.baseUrl }/movie/${ id }?api_key=${ this.apiKey }&language=en-US`)
  }

  getMovieCast( id: string ): Observable <Actors> {
    return this.http.get<Actors>(`${ this.baseUrl }/movie/${ id }/credits?api_key=${ this.apiKey }&language=en-US`)
  }

  search(query: string): Observable<Search> {
    return this.http.get<Search>(`${ this.baseUrl }/search/multi?api_key=${ this.apiKey }&language=en-US&query=${ query }&page=1&include_adult=false`)
  }
}
