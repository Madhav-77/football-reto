import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl!: "";
  constructor() { }

  loginUser(loginFormObj: any){
    console.log(loginFormObj)
  }
  registerUser(registerFormObj: any){
    console.log(registerFormObj)
  }
}
