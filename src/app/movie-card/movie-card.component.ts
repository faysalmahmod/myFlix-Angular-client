import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre/genre-dialog.component';
import { DirectorDialogComponent } from '../director/director-dialog.component';
import { MovieDetailDialogComponent } from '../movie-detail/movie-detail-dialog.component';
import { UserService } from "../user.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent
  implements OnInit {
  movies: IMovie[] = [];
  favoriteMovie: string[] = [];
  user: IUser = { Username: '', Email: '', Birthday: '', Password: '', favoriteMovie: [] };
  constructor(public fetchApiDataService: FetchApiDataService, public userService: UserService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiDataService.loadAllMovies().subscribe((resp: IMovie[]) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies
    });
  }

  getUser(): void {
    const userName = this.userService.getName();

    if (!userName) {
      throw new Error('Unknown User in MovieCardComponent');
    }

    this.fetchApiDataService
      .loadUser(userName)
      .subscribe((response: IUser) => {
        this.favoriteMovie = response.favoriteMovie || [];
        this.user = response;
      })
  }

  // this functions opens the dialog when Genre button is clicked
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  // this functions opens the dialog when Director button is clicked
  openDirectorDialog(Name: string, Bio: string, Birth: string, Death?: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birth,
        Death: Death,
      },
      width: '500px'
    });
  }

  // this functions opens the dialog when Synopsys button is clicked
  openMovieDetailDialog(Title: string, Description: string): void {
    this.dialog.open(MovieDetailDialogComponent, {
      data: {
        Title: Title,
        Description: Description,
      },
      width: '500px'
    });
  }
  /**
 * check, if movie is in user's favorite list
 * @param _id The id of the movie which should be checked for being a Favorite
 * @returns boolean
 */
  isFav(_id: string): boolean {
    return this.favoriteMovie.includes(_id);
  }

  // deselects movie as favorite movie
  deselectAsFavoriteMovie(Username: string, title: string): void {
    this.fetchApiDataService.deleteFavoriteMovies(
      Username,
      title
    ).subscribe((result) => {
      this.ngOnInit();
    })
  }

  // deselects movie as favorite movie
  selectAsFavoriteMovie(Username: string, title: string): void {

    this.fetchApiDataService.addFavoriteMovies(Username, title).subscribe((result) => {
      this.getUser()
    })
  }
}
