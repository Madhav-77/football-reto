import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.sass']
})
export class CreateTeamComponent implements OnInit {

  createTeam! : FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router) { }

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
      //api call to create team
    } else {
      //show err msg
    }
  }

}
