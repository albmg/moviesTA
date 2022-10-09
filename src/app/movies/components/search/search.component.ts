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


  query: string = 'b'

  constructor(
    private moviesService: MoviesService
  ) { }

  search(query: string) {
    console.log(this.query)

    this.moviesService.search(this.query)
      .subscribe(resp => {
        console.log(resp)
      })
  }

  ngOnInit(): void {
  }

}
