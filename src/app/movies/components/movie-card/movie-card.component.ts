import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../interfaces/popular.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styles: [
  ]
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: Result


  constructor() { }

  ngOnInit(): void {
  }

}
