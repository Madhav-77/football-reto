import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = "https://reto-football.herokuapp.com";
  constructor(private httpClient: HttpClient) { }

  loginUser(loginFormObj: any){
    let requestData = {
      "identifier": loginFormObj.username,
      "password": loginFormObj.password
    }
    return this.httpClient.post(this.baseUrl + "/auth/local", requestData);
    //console.log(loginFormObj)
  }
  
  registerUser(registerFormObj: any){
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
      return this.httpClient.get(this.baseUrl + "/users/me");
  }

  logoutUser() {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("EXP_STAMP");
  }
}
