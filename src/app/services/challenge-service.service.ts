import { Constants } from './../utils/Constants';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';



interface createChallenge {
  "match_date": string,
  "start_time": string,
  "end_time": string,
  "number_of_players": number,
  "creator": number,
  "ground": string
}
@Injectable({
  providedIn: 'root'
})
export class ChallengeServiceService {

  baseUrl = "https://reto-football.herokuapp.com";
  constructor(private httpClient: HttpClient) { }

  getAllChallenges(challengeDate: any) {

    let params = new HttpParams().set('match_date_gte', challengeDate);
    // 3. Return Response and populate the page.   
    return this.httpClient.get(this.baseUrl + "/challenges", { params: params });
  }


  acceptChallenge(challengeId: string, req: any) {

    // TODO:
    // 1. change jwtKey
    const jwtToken = localStorage.getItem("<jwt_token_key>");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${jwtToken}`
        'Authorization': `Bearer ${jwtToken}`
      }),
    };
    return this.httpClient.put(this.baseUrl + "/challenges/" + challengeId, req, httpOptions);

  }

  createChallenge(createChallengeObj: createChallenge) {
    // const jwtToken = localStorage.getItem()
    console.log("Challenge Service Called", createChallengeObj)
    return this.httpClient.post(Constants.domain + Constants.challenge_endpoint, createChallengeObj);
  }
}
