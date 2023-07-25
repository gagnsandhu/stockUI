import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Stock_Trading';
  constructor(private authservice: AuthService){}
  getLogin(){
    return this.authservice.getLoggedIn();
  }
}
