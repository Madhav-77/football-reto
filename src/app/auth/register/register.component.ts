import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;
  jwtHelper = new JwtHelperService();

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'username': new FormControl('', [
        Validators.required
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'phone': new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      'cPassword': new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  registerUserAPI() {
    if(this.registerForm.valid){
      this.authService.registerUser(this.registerForm.value).subscribe((data: any)=> {
        
        localStorage.setItem("JWT_TOKEN", data.jwt);
        localStorage.setItem("EXP_STAMP", this.jwtHelper.decodeToken(data.jwt).exp);
        if(data.user.role.type == "player")
          if(data.user.team){
            this.router.navigateByUrl('/');
          } else {
            this.router.navigateByUrl('/team');
          }
        else 
          this.router.navigateByUrl('/dashboard');
      }, (err) => {
        console.log(err);
      });
    } else {
      //show error msg
    }
  }

}
