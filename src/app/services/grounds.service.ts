import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroundsService {
  baseUrl = "https://reto-football.herokuapp.com/";
  constructor(private httpClient: HttpClient) { }

  getAllGrounds(){
    return this.httpClient.get<any>(this.baseUrl + "grounds");
    //console.log(loginFormObj)
  }
}
