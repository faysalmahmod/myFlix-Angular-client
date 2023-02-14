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
  favoriteMovie: IMovie[] = [];
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
  loadAllMovies(): void {
    this.fetchApiDataService.loadAllMovies()
      .subscribe((resp: IMovie[]) => {
        this.movies = resp;

        this.favoriteMovie = this.movies.filter(movie => this.user.favoriteMovie?.includes(movie._id));
      });
  }


  updateUser() {
    this.fetchApiDataService.updateUser(
      this.user
    ).subscribe((resp: IUser) => {
      this.snackBar.open('User updated.', undefined, { duration: 3000 })
      localStorage.setItem('user', resp.Username);
    });
  }

  deleteUser() {
    this.fetchApiDataService.deleteUser(this.user.Username).subscribe((resp: IUser[]) => {
      localStorage.removeItem('user');
      this.router.navigate(['welcome'])
    });
  }
}