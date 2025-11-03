import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddEditBoardlayoutComponent } from '../add-edit-boardlayout/add-edit-boardlayout.component';
import { TypeSelectComponent } from '../type-select/type-select.component';
import { BoardlayoutComponent } from "../../pages/boardlayout/boardlayout.component";
import { ColumnService, LayoutReadDto, LayoutService } from '../../swagger';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AlertDialogData } from '../../models/models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-layout-row',
  standalone: true,
  imports: [CommonModule, FormsModule, AddEditBoardlayoutComponent],
  templateUrl: './layout-row.component.html',
  styleUrl: './layout-row.component.scss'
})
export class LayoutRowComponent {

  @Input() rowData: LayoutReadDto = {};
  @Input() columns: string[] = [];

  @ViewChild(AddEditBoardlayoutComponent) child!: AddEditBoardlayoutComponent;

  @Output() onLayoutSave = new EventEmitter<void>();

  columnsCounter = this.rowData.columns?.length;

  @Input() isArchiveView: boolean = false;

  constructor(
      private layoutService: LayoutService,
      private columnService: ColumnService,
      private dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.columnsCounter = this.rowData.columns?.length;
  }
  
  isExpanded = false;

  toggleExpand(event: MouseEvent) {
    this.isExpanded = !this.isExpanded;
    event.stopPropagation();
  }

  onAddColumnClick() {
    this.columnsCounter = this.columnsCounter!+1;
    this.child.onAddColumn();
  }

  onDeleteColumn(value: number) {
    this.columnsCounter = value;
  }

  restoreLayout() {
    const dialogRef = this.dialog.open<AlertDialogComponent, AlertDialogData, boolean>(
      AlertDialogComponent,
      {
        width: '300px',
        backdropClass: 'custom-dialog-backdrop',
        panelClass: 'custom-dialog',
        data: {
          title: 'Restore Layout?',
          message: 'Are you sure you want to restore ' + this.rowData.name + '?',
          okText: 'Restore',
          cancelText: 'Cancel'
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rowData.isArchived = false;
        this.layoutService.apiLayoutPut(this.rowData).subscribe({
              next: (x) => {
                this.onLayoutSave.emit();
              },
              error: (err) => console.error(err)
            });
      } else {
        
      }
    });
  }

  onSaveClick() {

    this.rowData.columns = this.child.layoutColumns;
    console.log(this.rowData);
    this.layoutService.apiLayoutPut(this.rowData).subscribe({
      next: (x) => {

        if(this.child.columnToDelete !== null) {
          this.columnService.apiColumnIdDelete(this.child.columnToDelete.id!).subscribe({
            next: (x) => {
              this.onLayoutSave.emit();
            },
            error: (err) => console.error(err)
          });
        }else{
          this.onLayoutSave.emit();
        }

      },
      error: (err) => console.error(err)
    });
    
  }

  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  openDeleteDialog() {
  const dialogRef = this.dialog.open<AlertDialogComponent, AlertDialogData, boolean>(
    AlertDialogComponent,
    {
      width: '300px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog',
      data: {
        title: 'Archive Layout?',
        message: 'Are you sure you want to archive ' + this.rowData.name + '?',
        okText: 'Archive',
        cancelText: 'Cancel'
      }
    }
  );

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.rowData.isArchived = true;
      this.layoutService.apiLayoutPut(this.rowData).subscribe({
            next: (x) => {
              this.onLayoutSave.emit();
            },
            error: (err) => console.error(err)
          });
    } else {
      
    }
  });
}

}
