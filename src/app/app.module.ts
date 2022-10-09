import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MovieListComponent } from './movies/screens/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/screens/movie-details/movie-details.component';
import { HomeComponent } from './movies/screens/home/home.component';
import { MovieCardComponent } from './movies/components/movie-card/movie-card.component';
import { JoinPipe } from './movies/pipes/join.pipe';
import { SearchComponent } from './movies/components/search/search.component';
import { MovieSearchedComponent } from './movies/components/movie-searched/movie-searched.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    MovieListComponent,
    MovieDetailsComponent,
    HomeComponent,
    MovieCardComponent,
    JoinPipe,
    SearchComponent,
    MovieSearchedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
