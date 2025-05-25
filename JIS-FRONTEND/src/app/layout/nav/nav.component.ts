import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../api/service.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  navItems: any[] = [];
  userRole: string | null = null;
  userData: any;

  // Navigation items for logged out users
  guestNavItems = [
    { path: '/', title: 'Home', active: true },
    { path: '/login', title: 'Login', active: false },
    { path: '/signup', title: 'Signup', active: false },
  ];

  constructor(
    private router: Router,
    private api: ServiceService,
    private toast: HotToastService
  ) {
    // Check authentication status when component initializes
  }

  ngOnInit(): void {
    this.checkAuthStatus();
  }
  checkAuthStatus() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      this.isLoggedIn = true;
      this.userRole = this.userData?.response?.user.role;
      this.navItems = this.getRoleBasedNavItems();
    } else {
      this.isLoggedIn = false;
      this.userRole = null;
      this.navItems = this.guestNavItems;
    }
  }

  getRoleBasedNavItems() {
    if (!this.isLoggedIn) return [];

    const commonItems = [
      { path: '/', title: 'Home', active: true },
      { path: '/logout', title: 'Logout', active: false, action: 'logout' },
    ];

    switch (this.userRole) {
      case 'Registrar':
        return [
          { path: '/about', title: 'About', active: false },
          {
            title: 'Case',
            active: false,
            children: [
              { path: '/case/add', title: 'Add Case' },
              { path: '/case/update', title: 'Update Case' },
            ],
          },
          {
            title: 'Schedule',
            active: false,
            children: [
              { path: '/schedule/add', title: 'Add Schedule' },
              { path: '/schedule/update', title: 'Update Schedule' },
            ],
          },
          ...commonItems,
        ];
      case 'Judge':
        return [
          { path: '/about', title: 'About', active: false },
          { path: '/case-study', title: 'Case Study', active: false },
          ...commonItems,
        ];
      case 'Lawyer':
        return [
          { path: '/about', title: 'About', active: false },
          { path: '/case-study', title: 'Case Study', active: false },
          { path: '/profile', title: 'Profile', active: false },
          { path: '/payment', title: 'Payment', active: false },
          ...commonItems,
        ];
      default:
        return commonItems;
    }
  }

  handleLogout() {
    if (localStorage.getItem('user')) {
      this.api.logout();
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
      this.toast.success('Logout Successfully');
    } else {
      this.toast.error('You are not logout');
    }
  }
}
