import { Component, inject, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BoardReadDto, BoardService, InstanceReadDto, InstanceColumnReadDto, InstanceRowReadDto, InstanceCellReadDto, InstanceService } from '../../swagger';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-controlling',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule
  ],
  templateUrl: './controlling.component.html',
  styleUrls: ['./controlling.component.css'],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
  ]
})
export class ControllingComponent implements OnInit {
  private boardService = inject(BoardService);
  private instanceService = inject(InstanceService);

  // Data properties
  private allBoards = signal<BoardReadDto[]>([]);
  
  // State properties
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);
  selectedBoard = signal<BoardReadDto | null>(null);
  selectedInstances = signal<InstanceReadDto[]>([]); // Changed to signal array
  checkedElements = signal<Set<string>>(new Set());
  
  // View-bound properties
  filteredBoards = computed(() => {
    const start = this.startDate();
    const end = this.endDate();
    if (start && end) {
      if (start > end) {
        this.endDate.set(new Date(start.getTime()));
      }
      const startTime = start.getTime();
      const endTime = end.getTime();
      return this.allBoards().filter(board =>
        board.instances?.some(instance => {
          if (instance.entryPhaseStart) {
            const instanceDate = new Date(instance.entryPhaseStart).getTime();
            return instanceDate >= startTime && instanceDate <= endTime;
          }
          return false;
        })
      );
    }
    return this.allBoards();
  });

  filteredInstances = computed(() => {
    const board = this.selectedBoard();
    if (board && board.instances) {
      return [...board.instances];
    }
    return [];
  });

  selectedInstanceElements = signal<(InstanceColumnReadDto | InstanceRowReadDto)[]>([]);
  showPreview = signal<boolean>(false);

  constructor() {
    effect(() => {
      // Logic to reset selected instances if selected board is no longer valid
      if (this.selectedBoard() && !this.filteredBoards().find(b => b.id === this.selectedBoard()?.id)) {
        this.selectedBoard.set(null);
        this.selectedInstances.set([]);
        this.checkedElements.set(new Set());
        this.showPreview.set(false);
      }
    });

    effect(() => {
      // Fetch full instance details for all selected instances when selection changes
      const currentSelectedInstances = this.selectedInstances();
      this.selectedInstanceElements.set([]); // Clear previous elements
      this.checkedElements.set(new Set()); // Clear previous checked elements
      this.showPreview.set(currentSelectedInstances.length > 0); // Show preview if instances are selected

      if (currentSelectedInstances.length > 0) {
        const fetchObservables = currentSelectedInstances.map(instance =>
          this.instanceService.apiInstanceIdGet(instance.id!)
        );

        forkJoin(fetchObservables).subscribe({
          next: (fullInstances: InstanceReadDto[]) => {
            const allElements: (InstanceColumnReadDto | InstanceRowReadDto)[] = [];
            fullInstances.forEach(fullInstance => {
              if (fullInstance?.columns) {
                allElements.push(...fullInstance.columns);
              }
              if (fullInstance?.rows) {
                allElements.push(...fullInstance.rows);
              }
            });
            this.selectedInstanceElements.set(allElements);
          },
          error: (error) => {
            console.error('Error fetching full instance details:', error);
            this.selectedInstanceElements.set([]);
            this.showPreview.set(false); // Hide preview on error
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.boardService.apiBoardGet().subscribe(boards => {
      this.allBoards.set(boards);
    });
  }

  onDateChange(): void {
    // FilteredBoards computed property handles this
    this.selectedBoard.set(null);
    this.selectedInstances.set([]);
    this.checkedElements.set(new Set());
    this.showPreview.set(false);
  }

  onBoardSelectionChange(): void {
    this.selectedInstances.set([]); // Reset instance selection
    this.selectedInstanceElements.set([]); // Clear elements
    this.checkedElements.set(new Set()); // Clear checked elements
    this.showPreview.set(false);
  }

  onInstanceSelectionChange(): void {
    // Effect handles fetching and preview state
  }

  toggleElementSelection(elementId: string): void {
    this.checkedElements.update(elements => {
      const newElements = new Set(elements);
      if (newElements.has(elementId)) {
        newElements.delete(elementId);
      } else {
        newElements.add(elementId);
      }
      return newElements;
    });
  }

  getElementType(element: InstanceColumnReadDto | InstanceRowReadDto): string {
    return (element as InstanceColumnReadDto).type !== undefined ? 'Column' : 'Row';
  }

  getElementName(element: InstanceColumnReadDto | InstanceRowReadDto): string {
    return (element as any).name || 'Row';
  }

  getSelectedElements() {
    const checked = this.checkedElements();
    return this.selectedInstanceElements().filter(element => checked.has(element.id!));
  }

  getCellValue(cell: InstanceCellReadDto | undefined | null): string {
    if (!cell) return '';
    if (cell.textValue !== undefined && cell.textValue !== null) return cell.textValue;
    if (cell.numberValue !== undefined && cell.numberValue !== null) return cell.numberValue.toString();
    if (cell.boolValue !== undefined && cell.boolValue !== null) return cell.boolValue ? 'True' : 'False';
    if (cell.dateValue !== undefined && cell.dateValue !== null) return new Date(cell.dateValue).toLocaleDateString();
    return '';
  }

  endDateFilter = (d: Date | null): boolean => {
    const startDate = this.startDate();
    return startDate ? (d || new Date()) >= startDate : true;
  };

  generateReport() {
    const reportElement = document.getElementById('report-preview');
    if (reportElement) {
      html2canvas(reportElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('controlling_report.pdf');
      });
    }
  }
}