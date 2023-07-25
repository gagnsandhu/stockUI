import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @ViewChild('f')SignupForm!:NgForm;
  userData={
    username:"",
    email:"",
    password:""
  }
  isRegister:boolean = false;
  constructor(private httpClient:HttpClient,private authService:AuthService,private router:Router){}
  
  onSubmit(){
    this.userData.username = this.SignupForm.value.username;
    this.userData.password = this.SignupForm.value.password;
    this.userData.email = this.SignupForm.value.email;
    console.log(this.userData);
    console.log(this.SignupForm);
    if(this.SignupForm.value.password!=this.SignupForm.value.passwordRequired){
      console.log("error occured");
      alert("password not matched")
    }
    else{
    console.log(this.userData);
    this.authService.signup(this.SignupForm.value.username,this.SignupForm.value.password,this.SignupForm.value.email).subscribe(
      response =>{
        console.log(response);
      }
    );
    this.isRegister=true;
    this.authService.verifyOtp(this.SignupForm.value.username,this.SignupForm.value.otp);
    this.SignupForm.reset();
    // this.router.navigate(['/auth/login']);
    }
  }
  logIn(){
    this.router.navigate(['/auth/login']);
  }
}
