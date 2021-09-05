import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = "https://reto-football.herokuapp.com";

  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  

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
    if(localStorage.getItem("JWT_TOKEN")) {
      return true
    } else {
      return false;
    }
  }
}
