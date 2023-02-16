import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // close the dialog on success
import { FetchApiDataService } from "../fetch-api-data.service"; // import API calls
import { MatSnackBar } from "@angular/material/snack-bar"; // display notifications back to the user
import { Router } from '@angular/router';
import { MatCardActions } from "@angular/material/card";
import { UserService } from "../user.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    private router: Router,
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
  ) { }

  ngOnInit(): void {
  }
  /**
   * gets user Name and token from API call userLogin, displays success or error message, navigates to Movie list /Homepage
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open('Userrname or Password is wrong', 'Login Error', {
          duration: 2000
        });
      });
  }

}