import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = "https://reto-football.herokuapp.com/auth/local";
  constructor(private httpClient: HttpClient) { }

  loginUser(loginFormObj: any){
    console.log(loginFormObj)
  }
  
  registerUser(registerFormObj: any){
    return this.httpClient.post(this.baseUrl + "/register", registerFormObj);
    //console.log(registerFormObj)
  }
}
