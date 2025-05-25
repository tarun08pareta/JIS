import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.css'
})
export class DeleteConfirmModalComponent {
 constructor(public dialogRef: MatDialogRef<DeleteConfirmModalComponent>) {}
}
