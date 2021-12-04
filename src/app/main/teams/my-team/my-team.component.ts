import { ChallengeServiceService } from './../../../services/challenge-service.service';
import { TeamsService } from 'src/app/services/teams.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.sass']
})
export class MyTeamComponent implements OnInit {

  teamId: any;
  user: any;
  team: any;
  matchesPlayed: any;
  challengesCreated: any;
  challengesAccepted: any;

  constructor(
    private teamService: TeamsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private challengeService: ChallengeServiceService
  ) { }

  ngOnInit(): void {
    this.matchesPlayed = [];
    // console.log("ID ==>", );
    this.teamId = this.route.snapshot.paramMap.get('id');
    this.teamService.getTeamById(this.teamId).subscribe(data => {
      console.log("Get TeamById() data ==>", data)
      this.team = data;
    },
      err => {
        console.log("Error loading data on team page:", err)
      }),

      this.authService.getUserData().subscribe(data => {
        this.user = data;
        console.log("USer:", this.user)
      }, err => {
        console.log("Error Fetching data from authService in my-team component", err)
      })

    this.challengeService.getChallengesByCreatorId(this.teamId).subscribe(data => {
      this.challengesCreated = data;
      if (this.challengesCreated && this.challengesAccepted) {
        this._createChallengesPlayed(this.challengesAccepted, this.challengesCreated);
      }
    },
      err => {
        console.log("Error Fetching CHallenges created by team", err)
      })

    this.challengeService.getChallengesByAcceptorId(this.teamId).subscribe(data => {

      this.challengesAccepted = data;
      if (this.challengesCreated && this.challengesAccepted) {
        this._createChallengesPlayed(this.challengesAccepted, this.challengesCreated);
      }
    },
      err => {
        console.log("Error Fetching Challenges created by team", err)
      })



  }


  _createChallengesPlayed(acceptedChallenges: Object[], createdChallenges: Object[]) {

    let acceptedMatches = acceptedChallenges.filter((acceptedMatch: any) => acceptedMatch.hasOwnProperty('winner') && acceptedMatch['winner'] != null)

    let createdMatches = createdChallenges.filter((createdMatch: any) => createdMatch.hasOwnProperty('winner') && createdMatch['winner'] != null)

    console.log("accepted Challenges filtered ==>", acceptedMatches)

    console.log("created Challenges filtered ==>", createdMatches)
    this.matchesPlayed = [...acceptedMatches, ...createdMatches];
    this.matchesPlayed = this.matchesPlayed.sort((match1: any, match2: any) => {
      moment(match1.match_date).isBefore(match2.match_date)
    })
    console.log("challenges created by this.matchesPlayed ===> ", this.matchesPlayed);
  }




}
