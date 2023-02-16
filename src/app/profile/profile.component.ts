import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCardActions } from "@angular/material/card";
import { UserService } from "../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: IUser = { Username: '', Password: '', Email: '', Birthday: '' };
  favouriteMovie: IMovie[] = [];
  movies: IMovie[] = [];


  constructor(
    private router: Router,
    public fetchApiDataService: FetchApiDataService,
    public userService: UserService,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }
  /**
   * fetches user object data with user's current data (Name, Password, Birthday, Favorite Movies)
   */
  loadUser(): void {
    const userName = this.userService.getName();
    if (!userName) {
      throw new Error('Unknown User in ProfileComponent');
    }
    this.fetchApiDataService.loadUser(userName)
      .subscribe((response: IUser) => {
        const birthdayDate = new Date(Date.parse(response.Birthday));
        const birthdayString = birthdayDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).replace(/\. /g, '-').replace('.', '');

        this.user = {
          ...response,
          Password: '',
          Birthday: birthdayString,
        };

        this.loadAllMovies();
      });
  }
  /**
 * loads all movies and checks which movies are the user's favorite movies
 */
  loadAllMovies(): void {
    this.fetchApiDataService.loadAllMovies()
      .subscribe((resp: IMovie[]) => {
        this.movies = resp;
        this.favouriteMovie = this.movies.filter(movie => this.user.favouriteMovie?.includes(movie._id));
      });
  }
  /**
   * opens snackbar to inform about successful update of user information
   * adds user name to local storage and/or overwrites previously stored name
   */

  updateUser() {
    this.fetchApiDataService.updateUser(
      this.user
    ).subscribe((resp) => {
      this.snackBar.open('User updated.', undefined, { duration: 3000 });
      localStorage.setItem('user', resp.Username);
      window.location.reload();
    }, (response) => {
      //Error response
      //console.log('onUserUpdate() response2:', response);
      this.snackBar.open(response.errors[0].msg, 'OK', {
        duration: 6000
      });
    });
  } 
  /**
   * deletes the user data set from local storage, logs out and redirects the user to the welcome page
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to permanently delete this account?')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account has successfully been deleted!', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiDataService.deleteUser(this.user.Username).subscribe((resp: string) => {
        localStorage.removeItem('user');
        this.router.navigate(['welcome'])
      });
    }
  }
}