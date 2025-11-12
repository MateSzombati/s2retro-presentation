import { Component, computed, effect, HostListener, inject, Input, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BoardReadDto, InstanceReadDto, InstanceColumnReadDto, InstanceService, InstanceCategoryService } from '../../swagger';
import { rxResource } from '@angular/core/rxjs-interop';
import { FreetextComponent } from '../types/freetext/freetext.component';
import { NumberComponent } from '../types/number/number.component';
import { DateComponent } from '../types/date/date.component';
import { CategoryComponent } from '../types/category/category.component';

@Component({
  selector: 'app-retro-board-table',
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
    FreetextComponent,
    NumberComponent,
    DateComponent,
    CategoryComponent,
  ],
  templateUrl: './retro-board-table.component.html',
  styleUrl: './retro-board-table.component.scss',
})
export class RetroBoardTableComponent {

  private instanceService = inject(InstanceService);
  private instanceCategoryService = inject(InstanceCategoryService);

  @Input() boardData = signal<BoardReadDto | null>(null);
  @Input() scale: number = 1;

  isDragDisabled = false;
  startX = 0;
  startWidth = 0;
  resizingIndex: number | null = null;

  instanceId = computed(() => this.boardData()?.instances?.[0]?.id ?? null);


   instanceRef = rxResource<InstanceReadDto | null, { id: string | null }>({
    request: () => ({ id: this.instanceId() }), // reactive trigger
    loader: ({ request }) => {
      if (!request.id) return of(null);
      return from(this.instanceService.apiInstanceIdGet(request.id)).pipe(
        catchError((err) => {
          console.error('Error loading instance:', err);
          return of(null);
        })
      );
    },
    defaultValue: null,
  });


  instance = computed(() => this.instanceRef.value());

  categoryNames = signal<Record<string, string>>({});

  _ = effect(() => {
    console.log('Loaded instance:', this.instance());

    const inst = this.instance();
    if (!inst?.columns) return;


    const ids = inst.columns
      .map((c) => c.instanceCategoryId)
      .filter((id): id is string => !!id);

      
    ids.forEach((id) => {
      this.instanceCategoryService.apiInstanceCategoryIdGet(id).subscribe({
        next: (cat) => {
          const current = this.categoryNames();
          this.categoryNames.set({ ...current, [id]: cat.name ?? 'Unknown' });
        },
        error: (err) => console.error('Error loading category', err),
      });
    });

  });

  // table_layout = {
  //   layout_id: 1,
  //   layout_name: 'Demo Layout',
  //   columns: [
  //     { column_id: 1, column_title: 'Thema', type: 'Freitext', width: 133 },
  //     { column_id: 2, column_title: 'Beschreibung', type: 'Freitext', width: 133 },
  //     { column_id: 3, column_title: 'Zuordnug', type: 'MoodSelect', width: 133 },
  //     { column_id: 4, column_title: 'Action / Lösung', type: 'Freitext', width: 133 },
  //     { column_id: 5, column_title: 'Verantwortlich', type: 'Freitext', width: 133 },
  //     { column_id: 6, column_title: 'Datum', type: 'Datum', width: 133 },
  //     { column_id: 7, column_title: 'Status', type: 'Freitext', width: 133 },
  //     { column_id: 8, column_title: 'Status', type: 'Freitext', width: 133 },
  //   ],
  // };

  parseTypeName(column: InstanceColumnReadDto): string {
    if (column.type === 0 && column.instanceCategoryId) {

      //return actual category.name why cant i make a request here?
      return this.categoryNames()[column.instanceCategoryId] ?? 'Category';
    }

    switch (column.type) {
      case 0:
        return 'Text';
      case 1:
        return 'Number';
      case 2:
        return 'Date';
      default:
        return '';
    }
  }

  startResize(event: MouseEvent, index: number) {
    this.resizingIndex = index;
    this.startX = event.clientX;
    // this.startWidth = this.table_layout.columns[index].width;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.resizingIndex !== null) {
      const deltaX = event.clientX - this.startX;
      const newWidth = this.startWidth + deltaX;
      // this.table_layout.columns[this.resizingIndex].width = Math.max(newWidth, 100);
    }
  }

  @HostListener('document:mouseup')
  stopResize() {
    this.resizingIndex = null;
    this.isDragDisabled = false;
  }

  dropColumn(event: CdkDragDrop<any[]>) {
    // moveItemInArray(this.table_layout.columns, event.previousIndex, event.currentIndex);
  }

  disableDrag() {
    this.isDragDisabled = true;
  }

  enableDrag() {
    if (this.resizingIndex === null) {
      this.isDragDisabled = false;
    }
  }

  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  addRow() {
    // future implementation
  }
}
