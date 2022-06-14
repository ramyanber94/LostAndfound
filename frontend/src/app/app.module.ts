import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { HomeModule } from './home/home.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NotificationService } from './services/notification.service';

const config: SocketIoConfig = { url: 'http://localhost:8000/', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    MDBBootstrapModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    HomeModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

