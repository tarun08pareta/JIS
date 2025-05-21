import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';

const routes: Routes = [

   { path: '', redirectTo: '/home', pathMatch: 'full' }, // Check for redirects
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent,canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent ,canActivate: [NoAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
