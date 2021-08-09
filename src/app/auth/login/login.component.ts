import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService) { }

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
    //console.log(this.loginForm.value);
    if(this.loginForm.valid){
      this.authService.loginUser(this.loginForm.value).subscribe(data => {
        console.log(data);
      }, (err) => {
        console.log(err);
      });
    } else {
      //show error msg
    }
  }
}
