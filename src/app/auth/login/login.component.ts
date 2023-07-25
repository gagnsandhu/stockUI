import { Component, ViewChild, OnInit, ComponentFactoryResolver} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { Subscription } from 'rxjs';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // private closesub:Subscription;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  @ViewChild('f')LoginForm!: NgForm;
  userData = {
    username: "",
    password: ""
  }
  error:string='';
  isSignUp:boolean=false;
  loginResponse:string='';

  constructor(private http : HttpClient,private router:Router,private authService:AuthService,private componentFactoryResolver: ComponentFactoryResolver){}
  ngOnInit(): void {}

  onSubmit(){
    this.userData.username = this.LoginForm.value.username;
    this.userData.password = this.LoginForm.value.password;
     this.authService.login(this.userData.username,this.userData.password)
      .subscribe(
      response => {
  
        console.log( response);
        console.log("Success")
        if(response.statusCode == 200){
          this.authService.setAccessToken(response.body.AccessToken);
          this.authService.setLoggedIn(true);
         console.log(this.authService.getLoggedIn());
         this.authService.validateUser();
          this.router.navigate(['/home']);
        }
        // else{
        //   alert("Incorrect username or password");
        //   this.router.navigate(['/auth/login']);
        // }
      },
      errorMessage =>{
        console.log(errorMessage);
        this.error=errorMessage;
        this.showErrorAlert(errorMessage);

      }
    );
    this.LoginForm.reset();
  }

  signUp(){
    // return this.authService.setSignup(true);
    this.router.navigate(['/auth/signup']);
  }
  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    // this.closeSub = componentRef.instance.close.subscribe(() => {
    //   this.closeSub.unsubscribe();
    //   hostViewContainerRef.clear();
    // });
  }

}
