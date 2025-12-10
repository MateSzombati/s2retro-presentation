import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddEditBoardlayoutComponent } from '../add-edit-boardlayout/add-edit-boardlayout.component';
import { TypeSelectComponent } from '../type-select/type-select.component';
import { BoardlayoutComponent } from "../../pages/boardlayout/boardlayout.component";
import { ColumnReadDto, ColumnService, LayoutReadDto, LayoutService } from '../../swagger';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { AlertDialogData } from '../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

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

  isEdited = false;

  uneditedLayout: LayoutReadDto = {};

  maxColumns = 8;
  columnsCounter = this.rowData.columns?.length;
  addColumnDisabled = false;

  @Input() isArchiveView: boolean = false;

  constructor(
      private layoutService: LayoutService,
      private columnService: ColumnService,
      private dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.columnsCounter = this.rowData.columns?.length;
    this.checkIfColumnLimit();
    this.uneditedLayout = this.rowData;
  }
  
  isExpanded = false;

  toggleExpand(event: MouseEvent) {
    this.isExpanded = !this.isExpanded;
    event.stopPropagation();
  }

  onEditedLayout() {
    this.isEdited = true;
  }

  onAddColumnClick() {
    this.columnsCounter = this.columnsCounter!+1;
    this.child.onAddColumn();
    this.checkIfColumnLimit();
  }

  onDeleteColumn(value: ColumnReadDto[]) {
    this.columnsCounter = value.length;
    this.rowData.columns = value;
    this.checkIfColumnLimit();
    console.log(this.child.layoutColumns);
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
          message: 'Are you sure you want to restore ' + this.uneditedLayout.name + '?',
          okText: 'Restore',
          cancelText: 'Cancel',
          okColor: '#1c65adff',
          okHoverColor: '#1976d2',
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rowData.isArchived = false;
        this.layoutService.apiLayoutPut(this.uneditedLayout).subscribe({
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

        const deletes = this.child.columnsToDelete;

        if (deletes.length > 0) {

          forkJoin(
            deletes.map(col =>
              this.columnService.apiColumnIdDelete(col.id!)
            )
          ).subscribe({
            next: () => {
              this.onLayoutSave.emit();
              this.child.columnsToDelete = []; // clear deleted list
              this.isEdited = false;
            },
            error: err => console.error(err)
          });

        } else {
          this.onLayoutSave.emit();
        }


      },
      error: (err) => console.error(err)
    });
    
  }

  checkIfColumnLimit() {
    if(this.columnsCounter! >= this.maxColumns){
      this.addColumnDisabled = true;
    }
    else {
      this.addColumnDisabled = false;
    }
  }

  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  openDeleteDialog() {
    console.log(this.uneditedLayout);
    const dialogRef = this.dialog.open<AlertDialogComponent, AlertDialogData, boolean>(
      AlertDialogComponent,
      {
        width: '300px',
        backdropClass: 'custom-dialog-backdrop',
        panelClass: 'custom-dialog',
        data: {
          title: 'Archive Layout?',
          message: 'Are you sure you want to archive ' + this.uneditedLayout.name + '?',
          okText: 'Archive',
          cancelText: 'Cancel',
          okColor: '#bc133eff',
          okHoverColor: '#d21645ff', 
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rowData.isArchived = true;
        this.layoutService.apiLayoutPut(this.uneditedLayout).subscribe({
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
