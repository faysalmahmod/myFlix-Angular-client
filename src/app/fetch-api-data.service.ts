import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


const apiURL = 'https://moviesapi1.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // This will provide HttpClient to the entire class, making it available via this.http
  // apiURL = 'https://moviesapi1.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  /**
    * make API call for the user registration endpoint
    * @param user
    * @returns new user object in JSON
    * */
  public userRegistration(user: IUser): Observable<any> {
    console.log(user);
    return this.http
      .post(apiURL + 'users', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * make API call for login of existing user
  * @param user
  * @returns data of user in JSON
  * */
  public userLogin(user: IUserLogin): Observable<any> {
    console.log(user);
    return this.http
      .post(apiURL + 'login', user)
      .pipe(
        catchError(this.handleError)
      );
  }


  /**
   * make API call to get all movies
   * @returns array of all movie objects in JSON
   */
  loadAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<IMovie[]>(apiURL + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map((res: IMovie[]) => res || []),
        catchError(this.handleError)
      );
  }

  /**
   * make API call to get single movie by title
   * @param title
   * @returns JSON object holding movie data
   */

  getSingleMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<IMovie>(apiURL + `movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map((res: IMovie) => res || {}),
        catchError(this.handleError)
      );
  }


  /**
  * make API call to get director by name
  * @param name
  * @returns JSON object holding director data
  */

  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<IDirector>(apiURL + `movies/director/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map((res: IDirector) => res || {}),
        catchError(this.handleError)
      );
  }

  /**
   * make API call to get genre by name
   * @param name
   * @returns JSON object holding genre data
   */
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<IGenre>(apiURL + `movies/genre/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map((res: IGenre) => res || {}),
        catchError(this.handleError)
      );
  }

  /**
   * make API call to get users by name
   * @param name
   * @returns JSON object holding user data
   */
  loadUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<IUser>(apiURL + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map((res: IUser) => res || {}),
        catchError(this.handleError)
      );
  }

  /**
   * make API call to update user profile by name
   * @param user
   * @returns JSON object holding user data
   */
  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiURL + `users/${username}`, user, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe
        (map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * make API call to delete user profile by name
   * @param name
   * @returns string message
   */

  deleteUser(Username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<string>(apiURL + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * make API call to get favorite movies of one user by name
   * @param name
   * @returns array of strings in JSON object holding favorite movies of user
   **/
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(apiURL + `users/${username}/favourite`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
    * make API call to add favorite movies to user profile by name and title
    * @param name
    * @param title
    * @returns JSON object holding movie data
    **/
  addFavoriteMovies(Username: string, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiURL + `users/${Username}/favourite/${_id}`, { favouriteMovie: _id }, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * make API call to delete favorite movies from user profile by name and title
   * @param name
   * @param title
   * @returns JSON object holding movie data
   */

  deleteFavoriteMovies(Username: string, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiURL + `users/${Username}/movies/${_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * make API call to provide http header with bearer and token
 * @returns http header with bearer and token
 */

  getHttpHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer' + token
    });
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return new Error(
      'Something bad happened; please try again later.');
  }
}
