import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  public currentUser: any;
  public isAuthenticated$ = this.auth.isAuthenticated$

  constructor(private auth: AuthServiceService, private router: Router) { }

  ngOnInit(): void {

    this.auth.isUserAuthenticated();
    this.isAuthenticated$.subscribe(authenticated => {

      if (authenticated) {
        this.currentUser = true;
      } else {
        this.currentUser = false;
      }
    });
  }


  logout(){
    this.auth.logoutUser();
    this.router.navigateByUrl('/');
  }
}




