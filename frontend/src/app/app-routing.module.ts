import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LostPageComponent } from './home/lost-page/lost-page.component';
import { FoundPageComponent } from './home/found-page/found-page.component';
import { ProfilePageComponent } from './home/profile-page/profile-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent, // this is the component with the <router-outlet> in the template
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'lost', component: LostPageComponent },
      { path: 'found', component: FoundPageComponent },
      { path: 'profile', component: ProfilePageComponent },
      { path: 'landing', component: LandingPageComponent },
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
