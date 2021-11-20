import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-leaderbaord',
  templateUrl: './leaderbaord.component.html',
  styleUrls: ['./leaderbaord.component.sass']
})
export class LeaderbaordComponent implements OnInit {

  constructor(private teamService: TeamsService) { }

  ngOnInit(): void {
    console.log("ng On Init called")
    this.teamService.getLeaderBoard().subscribe(data => {
      console.log("Incoming Data ===>", data);
    },
      err => {
        console.log("Error Fetching data from getLeaderBoard Component", err);
      })
  }


}
