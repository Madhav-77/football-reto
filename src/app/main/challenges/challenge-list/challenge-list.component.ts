import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ChallengeServiceService } from './../../../services/challenge-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/utils/Constants';
import * as moment from 'moment';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.sass']
})
export class ChallengeListComponent implements OnInit {

  challenges: any;
  user: any;
  timeSlots: string[] = Constants.timeSlots;
  filter_start_time = "";
  challengeList: any;
  filter_challenge_location = "";

  challengeDate = moment().format('YYYY-MM-DD');
  today = moment().format('YYYY-MM-DD');
  errToasts: string = "";


  constructor(private router: Router, private challengeService: ChallengeServiceService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    // 1. create Date ahead of today


    this.onFilterDate();

    if (localStorage.getItem("JWT_TOKEN")) {
      console.log("has jwt")
      this.authService.getUserData().subscribe(user => {
        this.user = user;
      },
        err => {
          console.log(`Error in getUserData: `);
          console.log(err);
        })
    }



  }


  acceptChallenge(challengeId: string): void {
    console.log("this user ===>", this.user);

    if (this.user) {

      let request = {
        "acceptor": this.user.team
      }
      this.challengeService.acceptChallenge(challengeId, request)
        .subscribe(data => {
          console.log("Data for challenge created===>", data);
          // TODO:
          // 1. find in list of challenges and change the node so it is updated on the UI.
        },
          err => {
            console.log("Error in createChallenge: ", err)
          })
    }
    else {
      this.router.navigate(['login'])
    }
  }

  editChallenge(challengeId: string): void {
    console.log("ID ==> ", challengeId);
    this.router.navigate(['/create-challenge'], { queryParams: { challenge: challengeId } });
  }


  redirectToCreateChallenge() {
    console.log("in reredirectToCreateChallenge");
    if (!localStorage.getItem("JWT_TOKEN")) {
      this.router.navigateByUrl("login")
    }
    if (!this.user?.team) {
      this.router.navigateByUrl("team")
    }
    else {
      this.router.navigateByUrl("create-challenge")
    }
  }


  onFilterDate() {
    this.errToasts = "";

    this.challengeService.getAllChallenges(this.challengeDate).subscribe(data => {
      this.challengeList = this.challenges = data;
      console.log(data);
      console.log("this.challengeList are:", this.challengeList);
    }, (err) => {
      console.log(`Error in getAllChallenges: `);
      console.log(err);
    })
  }


  onFilterStartTime() {
    this.errToasts = "";

    if (!this.filter_start_time) {
      this.errToasts = "";
      this.challengeList = this.challenges;
    }
    // this.challenges
    let filteredChallenges = this.challenges.filter((challenge: any) => {
      // console.log("challenge ===>", challenge.start_time.includes(this.filter_start_time.split(" - ")[0]))
      if (challenge.start_time.includes(this.filter_start_time.split(" - ")[0]))
        return challenge
    })

    if (filteredChallenges.length > 0) {
      console.log("FilteredChallenges ===>", filteredChallenges)
      this.challengeList = filteredChallenges;
    }
    else {
      this.errToasts = "No Challenges Found on that Time. Maybe these could help";
      this.challengeList = this.challenges;
    }
  }

  onFilterLocation() {
    console.log("filter_challenge_location: ", this.filter_challenge_location);
    let filteredChallenges: any[] = [];
    this.errToasts = "";

    if (!this.filter_challenge_location) {
      this.errToasts = "";
      this.challengeList = this.challenges;
    }

    if (this.filter_challenge_location) {

      filteredChallenges = this.challenges.filter((challenge: any, index: any) => {
        console.log("Contains ?", challenge.ground.location.includes(this.filter_challenge_location));
        if (challenge.ground.location.includes(this.filter_challenge_location)) {
          return challenge;
        }
      });

      console.log("filteredChallenges:", filteredChallenges)


    }

    if (filteredChallenges.length > 0) {
      console.log("FilteredChallenges ===>", filteredChallenges)
      this.challengeList = filteredChallenges;
    }
    else {

      this.errToasts = "No Challenges Found on that Time. Maybe these could help";
      this.challengeList = this.challenges;
    }

  }

  deleteChallenge(challengeId: string) {

    this.challengeService.deleteChallenge(challengeId).subscribe((data: any) => {
      console.log("Deleted Challenge Response =>", data);
      let deletedChallengeIndex = this.challengeList.findIndex((challenge: any) => challenge.id === data.id)
      console.log("deletedChallengeIndex ===>", deletedChallengeIndex)
      this.challengeList.splice(deletedChallengeIndex, 1)
      console.log("Challenge List ==>", this.challengeList)
    },
      err => {
        console.log("Error During Delete Challenge", err);
      })
  }

}
