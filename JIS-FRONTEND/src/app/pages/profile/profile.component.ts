import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../api/service.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../../layout/nav/logout-confirmation-dialog/logout-confirmation-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any = null;

  constructor( private router: Router,
    private api: ServiceService,
    private toast: HotToastService,
    private dialog:MatDialog)
  {

  }
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      this.user = parsed?.response?.user;
    }
  }

  handleLogout() {
     const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (localStorage.getItem('user')) {
          this.api.logout();
          localStorage.removeItem('user');
          // this.isLoggedIn = false;
          this.router.navigate(['/login']);
          this.toast.success('Logout Successfully');
        } else {
          this.toast.error('You are not logged in');
        }
      }
    });
    }
}
