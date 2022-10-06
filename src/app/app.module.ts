import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MovieListComponent } from './movies/screens/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movies/screens/movie-details/movie-details.component';
import { HomeComponent } from './movies/screens/home/home.component';
import { MovieCardComponent } from './movies/components/movie-card/movie-card.component';
import { MovieDetailCardComponent } from './movies/components/movie-detail-card/movie-detail-card.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    MovieListComponent,
    MovieDetailsComponent,
    HomeComponent,
    MovieCardComponent,
    MovieDetailCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
