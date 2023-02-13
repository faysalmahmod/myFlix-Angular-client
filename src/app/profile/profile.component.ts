import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCardActions } from "@angular/material/card";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    private router: Router,
    public fetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    public MatCardActions: MatCardActions,
  ) { }

  ngOnInit(): void {

  }

  updateUser() {
    this.fetchApiDataService.updateUser(
      this.userData
    ).subscribe((resp: IUser) => {
      this.snackBar.open('User updated.')
      localStorage.setItem('user', resp.Username);
    });
  }

  deleteUser() {
    this.fetchApiDataService.deleteUser(this.userData.Username).subscribe((resp: IUser[]) => {
      localStorage.removeItem('user');
      this.router.navigate(['register'])
    });
  }
}