import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../api/service.service';
import { Router } from '@angular/router';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';

import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.css',
})
export class CaseListComponent implements OnInit {
  caseList: any[] = [];
  constructor(
    private api: ServiceService,
    private router: Router,
    private dialog: MatDialog,
    private toast: HotToastService
  ) {}
userRole: string = '';
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    console.log('user data', userData);
     if (userData) {
    const user = JSON.parse(userData);
    this.userRole = user?.response?.user?.role?.toLowerCase();  // Normalize for comparison
  }
    this.loadCases();
  }

  loadCases() {
    const userData = localStorage.getItem('user');
    if (!userData) {
      this.toast.error('User not found. Please log in.');
      return;
    }

    const user = JSON.parse(userData);
    const userId = user?.response?.user?.id;
    const userRole = user?.response?.user?.role;

    if (!userId || !userRole) {
      this.toast.error('Invalid user data.');
      return;
    }

    this.api.allCase().subscribe((data: any) => {
      const role = userRole?.toLowerCase();
      if (role === 'judge' || role === 'lawyer') {
        const filteredCases = data.filter((item: any) => {
          return (
            item.judge?.id === userId || item.lawyer?.id === userId
          );
        });
        this.caseList = filteredCases;
      } else {
        // Admin or other roles: show all
        this.caseList = data;
      }


    });
  }

  // In the component with the edit button
  editCase(id: number) {
    this.router.navigate(['/case'], { queryParams: { id } });
  }

  onDelete(id: any) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        this.api.deleteCase(id).subscribe({
          next: () => {
            // Refresh the list after deletion

            this.loadCases();
            this.toast.success('Case deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting case:', err);
            this.toast.error(err.error.message);
          },
        });
      }
    });
  }
}
