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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  provideHotToastConfig } from '@ngneat/hot-toast';
import { AboutComponent } from './pages/about/about.component';
import { CaseComponent } from './registrar/case/case.component';
import { CommonModule } from '@angular/common';
import { CaseListComponent } from './registrar/case-list/case-list.component';
import { DeleteConfirmModalComponent } from './registrar/case-list/delete-confirm-modal/delete-confirm-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ScheduleCaseComponent } from './registrar/schedule-case/schedule-case.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CaseDetailsComponent } from './registrar/case-details/case-details.component';
import { LogoutConfirmationDialogComponent } from './layout/nav/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { CaseStudyComponent } from './pages/case-study/case-study.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
    SignupComponent,
    AboutComponent,
    CaseComponent,
    CaseListComponent,
    DeleteConfirmModalComponent,
    ScheduleCaseComponent,
    CaseDetailsComponent,
    LogoutConfirmationDialogComponent,
    CaseStudyComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
     MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [ provideHotToastConfig({position: 'top-right'}), provideAnimationsAsync(),],
  bootstrap: [AppComponent]
})
export class AppModule { }
