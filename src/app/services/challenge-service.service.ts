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


  // TODO: point this to update challenge.
  acceptChallenge(challengeId: string, req: any) {
    return this.httpClient.put(Constants.domain + Constants.challenge_endpoint + challengeId, req);

  }

  updateChallenge(challengeId: string, req: any) {
    return this.httpClient.put(Constants.domain + Constants.challenge_endpoint + '/' + challengeId, req)
  }

  createChallenge(createChallengeObj: createChallenge) {
    // const jwtToken = localStorage.getItem()
    console.log("Challenge Service Called", createChallengeObj)
    return this.httpClient.post(Constants.domain + Constants.challenge_endpoint, createChallengeObj);
  }

  getChallengeById(challengeId: string) {
    return this.httpClient.get(Constants.domain + Constants.challenge_endpoint + "/" + challengeId);
  }

  deleteChallenge(challengeId: string) {
    return this.httpClient.delete(Constants.domain + Constants.challenge_endpoint + "/" + challengeId);
  }


  getChallengesByCreatorId(id: string) {
    return (this.httpClient.get(Constants.domain + Constants.challenge_endpoint + `?creator._id=${id}`));
  }

  getChallengesByAcceptorId(id: string) {
    return this.httpClient.get(Constants.domain + Constants.challenge_endpoint + `?acceptor._id=${id}`);
  }

  getChallengesByGroundAndDate(groundId: string, date:string){
    return this.httpClient.get(Constants.domain + Constants.challenge_endpoint + `?_where[ground.id]=${groundId}&_where[match_date_eq]=${date}&_sort=acceptor.name:DESC`)
  }
}
