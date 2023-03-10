import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {
  }

  navigateToMovies(): void {
    this.router.navigate(['movies']);
  }

  navigateToProfile(): void {
    this.router.navigate(['profile']);
  }

  logout(): void {
    localStorage.clear(); // removes all data stored
    this.router.navigate(['welcome']); // logging user out and navigating to welcome page to register again
  }

}