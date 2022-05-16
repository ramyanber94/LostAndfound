import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { DxPieChartModule } from 'devextreme-angular';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LostPageComponent } from './lost-page/lost-page.component';
import { FoundPageComponent } from './found-page/found-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HomeComponent } from './home.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LandingPageComponent } from './landing-page/landing-page.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    LostPageComponent,
    FoundPageComponent,
    ProfilePageComponent,
    HomeComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    MDBBootstrapModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    DxPieChartModule,
    RouterModule
  ]
})
export class HomeModule { }

platformBrowserDynamic().bootstrapModule(HomeModule);