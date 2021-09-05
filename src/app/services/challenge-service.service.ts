import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChallengeServiceService {

  baseUrl = "https://reto-football.herokuapp.com";
  constructor(private httpClient: HttpClient) { }

  getAllChallenges() {
    // 1. create Date ahead of today
    let today = moment().format('YYYY-MM-DD');
    // TODO:
    // 2. add query params match_date_gte= 1.(date)
    let params = new HttpParams().set('match_date_gte', today);

    // 3. Return Response and populate the page.   
    return this.httpClient.get(this.baseUrl + "/challenges", { params: params });
  }


  acceptChallenge(challengeId: string, req: any) {

    // TODO:
    // 1. change jwtKey
    const jwtToken = localStorage.getItem("<jwt_token_key>");

    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          // 'Authorization': `Bearer ${jwtToken}`
          'Authorization': `Bearer ${jwtToken}`
        }),
      };
    return this.httpClient.put(this.baseUrl + "/challenges/" + challengeId , req, httpOptions);

  }
}
