import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  baseUrl = "https://reto-football.herokuapp.com/";
  constructor(private httpClient: HttpClient) { }

  getAllTeamsServiceCall(){
    return this.httpClient.get<any>(this.baseUrl + "teams");
    //console.log(loginFormObj)
  }
}
