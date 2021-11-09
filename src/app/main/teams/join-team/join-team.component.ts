import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.sass']
})
export class JoinTeamComponent implements OnInit {

  constructor(private teamService: TeamsService, private authService: AuthServiceService) { }
  teamsList: any;
  userData: any;
  isTeamAssignedToUser?: boolean;

  ngOnInit(): void {
    this.getTeamsList();
    this.getLoggedInUserData();
  }

  getLoggedInUserData(){
    this.authService.getUserData().subscribe((data: any) => {
      console.log(data);
      this.userData = data;
      this.isTeamAssignedToUser = data.team ? true : false;
    }, (err) => {
      console.log(err)
    });
  }

  getTeamsList(){
    this.teamService.getAllTeamsServiceCall().subscribe((data: any) => {
      this.teamsList = data;
      console.log(this.teamsList);
    }, (err) => {
      console.log(err);
    });
  }
}