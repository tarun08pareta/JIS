// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toast: HotToastService
  ) {}

  canActivate(): boolean {
    const user = localStorage.getItem('user');

    if (user) {
      return true;
    } else {
      this.toast.warning('Please login to access this page');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
