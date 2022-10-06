import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PopularMovies } from './interfaces/popular.interface';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl: string = environment.baseUrl
  private apiKey: string = environment.apiKey

  constructor(private http: HttpClient) { }

    getPopularMovies(): Observable <PopularMovies> {
      return this.http.get<PopularMovies>(`${ this.baseUrl }/popular?api_key=${ this.apiKey }&language=en-US&page=1 `)
    }

}
