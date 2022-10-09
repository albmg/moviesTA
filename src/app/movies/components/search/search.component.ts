import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { Search } from '../../interfaces/search.interface';

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

    this.moviesService.search(this.query)
      .subscribe(resp => {
        console.log(resp)
        if (resp.results.length === 0) {
          this.errorResult = true
        }
      })
  }

  ngOnInit(): void {
  }

}
