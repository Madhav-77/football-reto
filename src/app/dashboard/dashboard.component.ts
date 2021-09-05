import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { GroundsService } from '../services/grounds.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthServiceService, 
    private groundService: GroundsService
  ) { }

  ngOnInit(): void {
    this.getGroundsList();
  }

  getGroundsList(){
    console.log("inside getGroundsList")
    this.groundService.getAllGrounds().subscribe(data => {
      console.log(data);
    }, (err) => {
      console.log(err);
    });
  }

}
