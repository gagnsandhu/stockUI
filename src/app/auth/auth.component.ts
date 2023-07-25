import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthService){}

  getSignUpStatus(){
    console.log(this.authService.getSignup());
    return this.authService.getSignup();
  }




}
