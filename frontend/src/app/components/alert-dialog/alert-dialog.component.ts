import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { AlertDialogData } from '../../models/models';

@Component({
  selector: 'app-alert-dialog',
  imports: [],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onOk(): void {
    this.dialogRef.close(true);
  }
}
