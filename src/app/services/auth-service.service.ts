import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = "https://reto-football.herokuapp.com/auth/local";
  constructor(private httpClient: HttpClient) { }

  loginUser(loginFormObj: any){
    let requestData = {
      "identifier": loginFormObj.username,
      "password": loginFormObj.password
    }
    return this.httpClient.post<any>(this.baseUrl, requestData);
    //console.log(loginFormObj)
  }
  
  registerUser(registerFormObj: any){
    return this.httpClient.post<any>(this.baseUrl + "/register", registerFormObj);
    //console.log(registerFormObj)
  }

  logoutUser() {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("EXP_STAMP");
  }
}
