import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../genre/genre-dialog.component';
import { DirectorDialogComponent } from '../director/director-dialog.component';
import { MovieDetailDialogComponent } from '../movie-detail/movie-detail-dialog.component';
import { UserService } from "../user.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent
  implements OnInit {
  movies: IMovie[] = [];
  favouriteMovie: string[] = [];
  user: IUser = { Username: '', Email: '', Birthday: '', Password: '', favouriteMovie: [] };
  constructor(public fetchApiDataService: FetchApiDataService, public userService: UserService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();   
  }

  /**
   * gets movies from API call and returns array if movies
   * @returns array of movie objects
   */


  getMovies(): void {
    this.fetchApiDataService.loadAllMovies().subscribe((resp: IMovie[]) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies
    });
  }
  /**
   * gets user data from API call and an array of favorite movies
   */
  getUser(): void {
    const userName = this.userService.getName();

    if (!userName) {
      throw new Error('Unknown User in MovieCardComponent');
    }

    this.fetchApiDataService
      .loadUser(userName)
      .subscribe((response: IUser) => {
        this.favouriteMovie = response.favouriteMovie || [];
        this.user = response;
      })
  }

  /**
   *   this functions opens the genre dialog when Genre button is clicked
   *   @param name
   *   @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
  * this functions opens the director dialog when Director button is clicked
  * @param Name
  * @param Bio
  * @param Birth
  * @param Death
  */
  openDirectorDialog(Name: string, Bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: Name,
        Bio: Bio
      },
      width: '500px'
    });
  }

  /**
   * this functions opens the dialog when Synopsys button is clicked
   * @param Title
   * @param Description
   */
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
  isFav(_id: any): boolean {
    return this.favouriteMovie.includes(_id);
  }

  /**
   * deselects movie as favorite movie
   * @param name (name of user)
   * @param title (title of movie)
   */
  deselectAsFavoriteMovie(Username: string, _id: any): void {
    this.fetchApiDataService.deleteFavoriteMovies(
      Username,
      _id
    ).subscribe((result) => {
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
  /**
   * selects movie as favorite movie
   * @param name (name of user)
   * @param title (title of movie)
   */


  selectAsFavoriteMovie(Username: string, _id: string): void {
    this.fetchApiDataService.addFavoriteMovies(Username, _id).subscribe((result) => {
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }


  onToggleFavMovie(Username: string,_id: string): void {
    //console.log(this.favoriteMovies);
    if(!this.favouriteMovie.includes(_id)) {
      this.fetchApiDataService.addFavoriteMovies(Username, _id).subscribe((res)=>{
        this.favouriteMovie=res.favouriteMovie;
        this.snackBar.open('Movie added to favourites.', 'OK', {
          duration: 3000
       })
      }, (res) => {
        //Error response
        //console.log('loginUser() response2:', res);
        this.snackBar.open(res.message, 'OK', {
          duration: 4000
        });
      })
    } else {
      this.fetchApiDataService.deleteFavoriteMovies(Username, _id).subscribe((res)=>{
        this.favouriteMovie=res.favoriteMovie;
        this.snackBar.open('Movie removed from favourites.', 'OK', {
          duration: 3000
       })
      }, (res) => {
        //Error response
        //console.log('loginUser() response2:', res);
        this.snackBar.open(res.message, 'OK', {
          duration: 4000
        });
      })
    }
  }


}