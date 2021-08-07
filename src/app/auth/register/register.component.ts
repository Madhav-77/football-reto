import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm! : FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'username': new FormControl('', [
        Validators.required,
        Validators.email
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

  registerUserAPI(){
    if(this.registerForm.valid){
      this.authService.registerUser(this.registerForm.value)
    } else {
      //show error msg
    }
  }

}
