import {Component, OnInit, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog'; // close the dialog on success
import {FetchApiDataService} from "../fetch-api-data.service"; // import API calls
import {MatSnackBar} from "@angular/material/snack-bar"; // display notifications back to the user

import {MatCardActions} from "@angular/material/card";

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = {Name: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
  ) {
  }

  ngOnInit(): void {
  }

  // send form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
          //TO DO: logic for user registration
          this.dialogRef.close(); // close modal on success
          this.snackBar.open(result, 'OK', {
            duration: 2000
          });
        },(result) => {
          this.snackBar.open(result, 'OK', {
            duration: 2000
          });
        });
    }
  }