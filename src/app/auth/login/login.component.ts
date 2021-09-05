import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  jwtHelper = new JwtHelperService();

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'username': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  loginUserAPI(){
    if(this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value).subscribe((data: any) => {
        localStorage.setItem("JWT_TOKEN", data.jwt);
        localStorage.setItem("EXP_STAMP", this.jwtHelper.decodeToken(data.jwt).exp);
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        console.log(err);
      });
    } else {
      //show error msg
    }
  }
}
