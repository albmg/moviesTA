import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { Result } from '../../interfaces/search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {


  query: string = ''

  errorResult: boolean = false

  constructor(
    private moviesService: MoviesService
  ) { }

  search(query: string) {
    this.errorResult = false

    this.moviesService.searchMovies(this.query)
      .subscribe(resp => {
        console.log(resp)
        this.moviesService.queryResultsFromApi = resp.results
        if (resp.results.length === 0) {
          this.errorResult = true
        }
      })
  }

  ngOnInit(): void {
  }

}
