import {
  Component,
  HostListener,
  Input
} from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeSelectComponent } from '../type-select/type-select.component';
import { FreetextComponent } from '../types/freetext/freetext.component';
import { NumberComponent } from '../types/number/number.component';
import { DateComponent } from '../types/date/date.component';
import { MoodComponent } from "../types/mood/mood.component";

@Component({
  selector: 'app-add-edit-boardlayout',
  imports: [CommonModule, FormsModule, DragDropModule, TypeSelectComponent, FreetextComponent, NumberComponent, DateComponent, MoodComponent],
  templateUrl: './add-edit-boardlayout.component.html',
  styleUrl: './add-edit-boardlayout.component.scss'
})
export class AddEditBoardlayoutComponent {

  @Input() scale: number = 1;
  
  isDragDisabled = false;

  startX = 0;
  startWidth = 0;


  table_layout = {
    layout_id: 1,
    layout_name: 'Demo Layout',
    columns: [
      { column_id: 1, column_title: 'Thema', type: '', width: 133 },
      { column_id: 2, column_title: 'Beschreibung', type: '', width: 133 },
      { column_id: 3, column_title: 'Zuordnug', type: '', width: 133 },
      { column_id: 4, column_title: 'Action / Lösung', type: '', width: 133 },
      { column_id: 5, column_title: 'Verantwortlich', type: '', width: 133 },
      { column_id: 6, column_title: 'Datum', type: '', width: 133 },
      { column_id: 7, column_title: 'Status', type: '', width: 133 },
      { column_id: 8, column_title: 'Status', type: '', width: 133 },
      // { column_id: 9, column_title: 'Status', type: '', width: 133 },
      // { column_id: 10, column_title: 'Status', type: '', width: 133 },
    ],
  };

  resizingIndex: number | null = null;

  startResize(event: MouseEvent, index: number) {
    this.resizingIndex = index;
    this.startX = event.clientX;
    this.startWidth = this.table_layout.columns[index].width;
    event.preventDefault();
  }


  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.resizingIndex !== null) {
      const deltaX = event.clientX - this.startX;
      const newWidth = this.startWidth + deltaX;
      this.table_layout.columns[this.resizingIndex].width = Math.max(newWidth, 100);
    }
  }


  @HostListener('document:mouseup')
  stopResize() {
    this.resizingIndex = null;
    this.isDragDisabled = false;
  }


  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.table_layout.columns, event.previousIndex, event.currentIndex);
  }

  disableDrag() {
    this.isDragDisabled = true;
  }

  enableDrag() {
    // Only re-enable dragging if not resizing
    if (this.resizingIndex === null) {
      this.isDragDisabled = false;
    }
  }


  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
    console.log(this.table_layout);
  }
  


}
