import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
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
import { ColumnCreateDto, ColumnReadDto, LayoutService } from '../../swagger';

@Component({
  selector: 'app-add-edit-boardlayout',
  imports: [CommonModule, FormsModule, DragDropModule, TypeSelectComponent],
  templateUrl: './add-edit-boardlayout.component.html',
  styleUrl: './add-edit-boardlayout.component.scss'
})
export class AddEditBoardlayoutComponent {

  @Input() scale: number = 1;
  
  isDragDisabled = false;

  startX = 0;
  startWidth = 0;

  @Input() layoutColumns: ColumnReadDto[] = [];

  @Output() onColumnDelete = new EventEmitter<number>();

  columnToDelete: ColumnReadDto | null = null;

  constructor(
    private layoutService: LayoutService,
  ) {}

  ngOnInit() {
    this.layoutColumns.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  }


  table_layout = {
    layout_id: 1,
    layout_name: 'Demo Layout',
    columns: [
      { column_id: 1, column_title: 'Thema', type: '', width: 133 },
      { column_id: 2, column_title: 'Beschreibung', type: '', width: 133 },
      { column_id: 3, column_title: 'Zuordnug', type: '', width: 133 },
      { column_id: 4, column_title: 'Action / Lösung', type: '', width: 133 },
      // { column_id: 5, column_title: 'Verantwortlich', type: '', width: 133 },
      // { column_id: 6, column_title: 'Datum', type: '', width: 133 },
      // { column_id: 7, column_title: 'Status', type: '', width: 133 },
      // { column_id: 8, column_title: 'Status', type: '', width: 133 },
      // { column_id: 9, column_title: 'Status', type: '', width: 133 },
      // { column_id: 10, column_title: 'Status', type: '', width: 133 },
    ],
  };

  onAddColumn() {
    const newColumn: ColumnReadDto = {
      name: "New Column",
      position: this.layoutColumns.length-1
    };
    this.layoutColumns.push(newColumn);
  }

  onDeleteColumn(index: number) {
    this.columnToDelete = this.layoutColumns[index];
    this.layoutColumns.splice(index, 1);
    this.onColumnDelete.emit(this.layoutColumns.length);

    this.layoutColumns.forEach((col, index) => {
      col.position = index;
    });
  }


  // columnHeights: number[] = [];
  // generalRowHeight = 0;

  // changeRowHeight(colIndex: number, newHeight: number) {
  //   this.columnHeights[colIndex] = newHeight;
  //   const validHeights = this.columnHeights.filter(h => h !== undefined && h !== null);
    
  //   if (validHeights.length > 0) {
  //     this.generalRowHeight = Math.max(0, ...validHeights);
  //   } else {
  //     this.generalRowHeight = 0;
  //   }
    
  //   console.log(this.generalRowHeight);
  // }


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


  dropColumn(event: CdkDragDrop<ColumnReadDto[]>) {
    moveItemInArray(this.layoutColumns, event.previousIndex, event.currentIndex);

    // ✅ Update position without replacing objects (no reset problem)
    this.layoutColumns.forEach((col, index) => {
      col.position = index;
    });

    this.layoutColumns.sort((a, b) => a.position! - b.position!);
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
  }


  


}
