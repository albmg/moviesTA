import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/search.interface';

@Component({
  selector: 'app-movie-searched',
  templateUrl: './movie-searched.component.html',
  styles: [
  ]
})
export class MovieSearchedComponent implements OnInit {


  @Input() movie!: Result

  constructor() { }

  ngOnInit(): void {
  }

}
