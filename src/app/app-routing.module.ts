import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AuthguardGuard } from './shared/authguard/authguard.guard';

const routes: Routes = [
  // {path:'home',component: HomeComponent},
  {path:'home',component: HomeComponent,canActivate: [AuthguardGuard]},
  {path:'auth/login',component: LoginComponent},
  {path:'auth/signup',component: SignUpComponent},
  { path:'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
  {path:"**",redirectTo:'/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
