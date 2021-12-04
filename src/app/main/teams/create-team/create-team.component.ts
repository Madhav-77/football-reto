import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.sass']
})
export class CreateTeamComponent implements OnInit {

  createTeam! : FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router, private teamService: TeamsService) { }

  ngOnInit(): void {
    this.createTeam = this.formBuilder.group({
      'teamName': new FormControl('', [
        Validators.required
      ])
    })
  }

  createTeamAPI(){
    if(this.createTeam.valid){
      console.log(this.createTeam.value)
      this.authService.getUserData().subscribe((data: any) => {
        let createTeamObj = {
          "name": this.createTeam.value.teamName,
          "owner": data.id,
        }
        //api call to create team
        this.teamService.createTeam(createTeamObj).subscribe((data: any)=> {
          console.log(data);
          //where to redirect
        }, (err) => {
          console.log(err);
        });      
      }, (err) => {
        console.log(err);
      });
    } else {
      //show err msg
    }
  }

}
