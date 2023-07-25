import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private router: Router,private authservice:AuthService){}
  logOut(){
    this.authservice.removeAccessToken();
    this.authservice.setLoggedIn(false);
    this.router.navigate(['/auth/login']);
  }
}
