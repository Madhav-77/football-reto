import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

// interface User{
//   "confirmed": boolean,
//   "blocked": boolean,
//   "_id": string,
//   "username": string,
//   "email": string,
//   "provider": string,
//   "createdAt": string,
//   "updatedAt": string,
//   "__v": number,
//   "role": {
//       "_id": string,
//       "name": string,
//       "description": string,
//       "type": string,
//       "__v": 0,
//       "id": string
//   },
//   "team_owned": {
//       "points": string,
//       "_id": string,
//       "name": string,
//       "createdAt": string,
//       "updatedAt": string,
//       "__v": 0,
//       "owner": string,
//       "id": string
//   },
//   "team": {
//       "points": "3000",
//       "_id": "611a4c2991b1bf00152ef2f0",
//       "name": "Test Team A",
//       "createdAt": "2021-08-16T11:29:45.666Z",
//       "updatedAt": "2021-08-16T11:29:46.369Z",
//       "__v": 0,
//       "owner": "60fbde42ac1543608860c0e7",
//       "id": "611a4c2991b1bf00152ef2f0"
//   },
//   "id": "60fbde42ac1543608860c0e7"
// }
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = "https://reto-football.herokuapp.com";

  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  user = {};


  constructor(private httpClient: HttpClient) {
    const helper = new JwtHelperService();
    let token = localStorage.getItem('JWT_TOKEN');
    if (token) {
      this.isAuthenticated$.next(true);
    }
  }

  loginUser(loginFormObj: any) {
    let requestData = {
      "identifier": loginFormObj.username,
      "password": loginFormObj.password
    }
    this.isAuthenticated$.next(true);
    return this.httpClient.post(this.baseUrl + "/auth/local", requestData);

    //console.log(loginFormObj)
  }

  registerUser(registerFormObj: any) {
    return this.httpClient.post(this.baseUrl + "/auth/local/register", registerFormObj);
    //console.log(registerFormObj)
  }

  // TODO: check implementation
  getUserData() {
    // const jwtToken = localStorage.getItem("<jwt_token_key>");

    // const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       // 'Authorization': `Bearer ${jwtToken}`
    //       'Authorization': `Bearer ${jwtToken}`
    //     }),
    //   };
    this.isAuthenticated$.next(true);
    return this.httpClient.get(this.baseUrl + "/users/me");
  }


  isUserAuthenticated() {
    let token = localStorage.getItem('JWT_TOKEN')
    if (token) {
      this.isAuthenticated$.next(true);
    }
    else {
      this.isAuthenticated$.next(false);
    }
  }

  logoutUser() {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("EXP_STAMP");
    this.isAuthenticated$.next(false);
  }

  isUserLoggedIn() {
    if (localStorage.getItem("JWT_TOKEN")) {
      return true
    } else {
      return false;
    }
  }
}
