# Movie-API-Client "MyFlix" in Angular



## Description
This project is using Angular and Angular Material to build the client-side for a movie application. It complements the server-side (REST API and database). You can see the GitHub repo [here](https://github.com/faysalmahmod/myFlix-Angular-client).


## Objective
This application was built to explore the differences of building the client-side with Angular instead of React (see client-side built in React [here](https://github.com/faysalmahmod/myFlix-Angular-client))


## User Stories

* As a user, I want to be able to access information on movies, directors, and genres so that I can learn more about movies I have watched or am interested in.
* As a user, I want to be able to create a profile, so that I can save data about my favorite movies.

## User Flow Chart



## Key Features

* welcome screen with login form & registration form
* list of all movies (after authentication)
* director dialog, genre dialog, synopsis dialog
* profile with 
  * data from registration form 
  * button to update information
  * button to delete whole profile
  * list of favorite movies (which have been selected from movie list)

This single-page-application provides the following major views - NavBar excluded:

### Welcome Screen

Welcome screen informing about purpose of the app and allowing the user to register and/or login.



### Registration

Registering for new users (username, password, email, birthday)




### Login

log in with a username and password



### Main / Movie list

* List of ALL movies 
* allows user to add and remove (toggle) a movie to their list of favorites by clicking a heart icon
* allows user to click on links to see detailed information about the genre, the director and the synopsis of the movie




### Synopsis
Clicking on a link in the movie card returns a description of the movie story.

### Genre
Clicking on a link in the movie card returns a description of the genre.



### Director
Clicking on a link in the movie card returns data about the director of the movie (name, bio, birth year, death year)


### Profile

* Users can update their user info (username, password, email, date of birth)
* Users can delete their profile / deregister
* Display of a list of favorite movies, which were selected by clicking the heart icon in the movie card





## Project Management and Documentation

### Kanban Board (Trello) and Story Points




### How To Run Project Locally

Clone the project

```bash
  git clone https://github.com/faysalmahmod/myFlix-Angular-client
```

Go to the project directory

```bash
  cd myFlix-Angular-client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## What challenges did I face, what did I learn? 




**Solution:** 

## Further Information

<details>
  <summary>Click to expand!</summary>
  
# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
