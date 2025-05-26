import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { AboutComponent } from './pages/about/about.component';
import { CaseComponent } from './registrar/case/case.component';
import { CaseListComponent } from './registrar/case-list/case-list.component';
import { ScheduleCaseComponent } from './registrar/schedule-case/schedule-case.component';
import { CaseDetailsComponent } from './registrar/case-details/case-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Check for redirects
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'about', component: AboutComponent },
  {
    path: 'case',
    component: CaseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'case/:id',
    component: CaseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'case-list',
    component: CaseListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'case-schedule',
    component: ScheduleCaseComponent,
  },
  {
    path: 'case-schedule/:id',
    component: ScheduleCaseComponent,
  },
  {
    path: 'case-details/:id',
    component: CaseDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
