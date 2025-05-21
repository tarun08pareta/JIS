import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JudgeLandingPageComponent } from './judge/judge-landing-page/judge-landing-page.component';
import { LawyerLandingPageComponent } from './lawyer/lawyer-landing-page/lawyer-landing-page.component';
import { RegistrarLandingPageComponent } from './registrar/registrar-landing-page/registrar-landing-page.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  provideHotToastConfig } from '@ngneat/hot-toast';
@NgModule({
  declarations: [
    AppComponent,
    JudgeLandingPageComponent,
    LawyerLandingPageComponent,
    RegistrarLandingPageComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ provideHotToastConfig({position: 'top-right'}),],
  bootstrap: [AppComponent]
})
export class AppModule { }
