import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  baseUrl = "https://reto-football.herokuapp.com/";
  constructor(private httpClient: HttpClient) { }

  getAllTeamsServiceCall() {
    return this.httpClient.get<any>(this.baseUrl + "teams");
    //console.log(loginFormObj)
  }


  getLeaderBoard() {
    return this.httpClient.get<any>(this.baseUrl + "teams?_sort=points:DESC");
  }

  getTeamById(id: string) {
    return this.httpClient.get<any>(this.baseUrl + "teams/" + id);
  }
}
