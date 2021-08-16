import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ChallengeServiceService } from './../../../services/challenge-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.sass']
})
export class ChallengeListComponent implements OnInit {

  challenges: any;
  user: any;
  constructor(private router: Router, private challengeService: ChallengeServiceService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.challengeService.getAllChallenges().subscribe(data => {
      this.challenges = data;
      console.log(data);
      console.log("Challenges are:", this.challenges);
    }, (err) => {
      console.log(`Error in getAllChallenges: `);
      console.log(err);
    })

    // TODO: make call to user.me Here if token is present.
    // if (localStorage.getItem("jwt_token_key")) {
    //   this.authService.getUserData().subscribe(user => {
    //     this.user = user;
    //   },
    //     err => {
    //       console.log(`Error in getUserData: `);
    //       console.log(err);
    //     })
    // }

 

  }


  acceptChallenge(challengeId: string): void {

    if (this.user) {
      let request = {
        "acceptor": this.user.team
      }
      this.challengeService.acceptChallenge(challengeId, request)
      .subscribe(data => {
        console.log("Data for challenge created===>", data);
      },
      err => {
        console.log("Error in createChallenge: ", err)
      })
    }


    this.router.navigate(['login'])


  }
}
