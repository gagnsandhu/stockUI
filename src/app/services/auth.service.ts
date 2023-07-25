import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
import { CognitoJwtVerifier } from "aws-jwt-verify";
// import { CognitoIdentityServiceProvider} from 'aws-sdk';

export interface responseData{
  statusCode:number;
  body:{
      AccessToken:string;
      ExpiresIn:number;
      IdToken:string;
      RefreshToken:string;
      TokenType:string;
  };
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn: boolean = false;
  isSignup:boolean = false;
  
  _accessToken:string;

  // private readonly USER_POOL_ID = 'ap-south-1_BUbFUmW8n';
  // private readonly CLIENT_ID = '2cp03n8c59gg6fu4enjknumtbl';
  //,private cognitoIdentityServiceProvider:CognitoIdentityServiceProvider
  constructor(private http: HttpClient) { }

  login(username:string, password:string){
     return this.http.post<responseData>('https://dzgdbk8ag6.execute-api.ap-south-1.amazonaws.com/Prod/auth/login',{
      username:username,
      password:password
    })
    .pipe(
      map(response =>{
        this._accessToken=response.body.AccessToken;
        return {statusCode:response.statusCode,
        body:{
          AccessToken:response.body.AccessToken,
          ExpiresIn:response.body.ExpiresIn,
          IdToken:response.body.IdToken,
          RefreshToken:response.body.RefreshToken,
          TokenType:response.body.TokenType,
        },
        };
      })
    )
  }

  signup(username:string, password:string,email:string){
    return this.http.post('https://dzgdbk8ag6.execute-api.ap-south-1.amazonaws.com/Prod/auth/signup',{
      username:username,
      password:password,
      email:email
    })
  }
  setLoggedIn(logged:boolean){
    this.isLoggedIn = logged;
  }

  getLoggedIn(){
    return this.isLoggedIn;
  }

  setSignup(signup:boolean){
    this.isSignup = signup;
  }

  getSignup(){
    return this.isSignup;
  }

  setAccessToken(token: string): void {
    // localStorage.setItem(this._accessToken, token);
    localStorage.setItem("AccessToken", token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem("AccessToken");
  }

  removeAccessToken(): void {
    localStorage.removeItem("AccessToken");
  }
  
  // verifyOtp(username: string, otp: string): Promise<void> {
  //   const params = {
  //     ClientId: this.CLIENT_ID,
  //     Username: username,
  //     ConfirmationCode: otp,
  //   };

  //   return new Promise((resolve, reject) => {
  //     this.cognitoIdentityServiceProvider.confirmSignUp(params, (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // }
  
  verifyOtp(username: string, otp: string){
    this.http.post('https://dzgdbk8ag6.execute-api.ap-south-1.amazonaws.com/Prod/auth/signup/verifyotp',{
      username:username,
      otp:otp
    }).subscribe(
      response => {
        console.log(response);
      }
    )
  }


  async validateUser(){
    //....
    const verifier = CognitoJwtVerifier.create({
      userPoolId: "ap-south-1_BUbFUmW8n",
      tokenUse: "access",
      clientId: "2cp03n8c59gg6fu4enjknumtbl",
    });
    
    try {
      console.log("validate user");
      const payload = await verifier.verify(
        this._accessToken
      );
      console.log("Token is valid. Payload:", payload);
    } catch {
      console.log("Token not valid!");
    }
  }
}
