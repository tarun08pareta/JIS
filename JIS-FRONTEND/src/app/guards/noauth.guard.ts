// guards/no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user');

    if (!isLoggedIn) {
      return true; // Allow access to login/signup if not logged in
    } else {
      this.router.navigate(['/home']); // Redirect to home if already logged in
      return false;
    }
  }
}
