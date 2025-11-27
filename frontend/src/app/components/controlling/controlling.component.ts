import { Component, inject, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
// Import DTOs and services from the generated Swagger client
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
    provideNativeDateAdapter(), // Provides date adapter for Material Datepicker
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' } // Sets date locale to German
  ]
})
export class ControllingComponent implements OnInit {
  // Inject services for data interaction
  private boardService = inject(BoardService);
  private instanceService = inject(InstanceService);

  // Stores all boards fetched from the API
  private allBoards = signal<BoardReadDto[]>([]);
  
  // --- State Properties (User selections and UI state) ---
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);
  onlyClosedBoards = signal<boolean>(false);
  selectedBoard = signal<BoardReadDto | null>(null);
  selectedInstances = signal<InstanceReadDto[]>([]);
  selectedFullInstances = signal<InstanceReadDto[]>([]);
  checkedElements = signal<Set<string>>(new Set());
  
  // Filters boards based on date range and 'onlyClosedBoards' checkbox
  filteredBoards = computed(() => {
    const start = this.startDate();
    const end = this.endDate();
    const onlyClosed = this.onlyClosedBoards();

    let boards = this.allBoards();

    // Filter by archived status if checkbox is checked
    if (onlyClosed) {
      boards = boards.filter(board => board.instances?.some(instance => instance.isArchived));
    }

    // Filter by date range if start and end dates are set
    if (start && end) {
      if (start > end) {
        this.endDate.set(new Date(start.getTime()));
      }
      const startTime = start.getTime();
      const endTime = end.getTime();
      boards = boards.filter(board =>
        board.instances?.some(instance => {
          if (instance.entryPhaseStart) {
            const instanceDate = new Date(instance.entryPhaseStart).getTime();
            return instanceDate >= startTime && instanceDate <= endTime;
          }
          return false;
        })
      );
    }
    return boards;
  });

  // Filters instances based on the currently selected board
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
    // Effect to reset selections if the current board becomes invalid due to filters
    effect(() => {
      if (this.selectedBoard() && !this.filteredBoards().find(b => b.id === this.selectedBoard()?.id)) {
        this.selectedBoard.set(null);
        this.selectedInstances.set([]);
        this.selectedFullInstances.set([]);
        this.checkedElements.set(new Set());
        this.showPreview.set(false);
      }
    });

    // Effect to fetch full instance details when selectedInstances changes
    effect(() => {
      const currentSelectedInstances = this.selectedInstances();
      this.selectedInstanceElements.set([]);
      this.selectedFullInstances.set([]);
      this.checkedElements.set(new Set());
      this.showPreview.set(currentSelectedInstances.length > 0); // Show preview if instances are selected

      if (currentSelectedInstances.length > 0) {
        // Create observables to fetch full details for each selected instance
        const fetchObservables = currentSelectedInstances.map(instance =>
          this.instanceService.apiInstanceIdGet(instance.id!)
        );

        // Fetch all instance details in parallel
        forkJoin(fetchObservables).subscribe({
          next: (fullInstances: InstanceReadDto[]) => {
            this.selectedFullInstances.set(fullInstances); // Update with full instance data
            const allElements: (InstanceColumnReadDto | InstanceRowReadDto)[] = [];
            fullInstances.forEach(fullInstance => {
              if (fullInstance?.columns) {
                allElements.push(...fullInstance.columns);
              }
              if (fullInstance?.rows) {
                allElements.push(...fullInstance.rows);
              }
            });
            this.selectedInstanceElements.set(allElements); // Populate all elements for selection
          },
          error: (error) => {
            console.error('Error fetching full instance details:', error);
            this.selectedInstanceElements.set([]);
            this.selectedFullInstances.set([]);
            this.showPreview.set(false); // Hide preview on error
          }
        });
      }
    });
  }

  ngOnInit(): void {
    // Fetch all boards when the component initializes
    this.boardService.apiBoardGet().subscribe(boards => {
      this.allBoards.set(boards);
    });
  }

  // Resets all selections and preview when any filter (date, closed boards) changes
  onFilterChange(): void {
    this.restInstanceSelections();
  }

  // Resets instance-related selections when the selected board changes
  onBoardSelectionChange(): void {
    this.restInstanceSelections();
  }

  restInstanceSelections(): void{
    this.selectedInstances.set([]);
    this.selectedFullInstances.set([]);
    this.selectedInstanceElements.set([]);
    this.checkedElements.set(new Set());
    this.showPreview.set(false);
  }

  // Toggles the selection state of an element (column or row) for reporting
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

  // Determines if an element is a 'Column' or 'Row'
  getElementType(element: InstanceColumnReadDto | InstanceRowReadDto): string {
    return (element as InstanceColumnReadDto).type !== undefined ? 'Column' : 'Row';
  }

  // Provides a display name for an element (column or row)
  getElementName(element: InstanceColumnReadDto | InstanceRowReadDto): string {
    if ((element as InstanceColumnReadDto).type !== undefined) {
      return (element as InstanceColumnReadDto).name || 'Unnamed Column';
    } else {
      return `Row ${(element as InstanceRowReadDto).position}`;
    }
  }

  // Computed signal to get only the elements that are checked for the report
  selectedElements = computed(() => {
    const checked = this.checkedElements();
    return this.selectedInstanceElements().filter(element => checked.has(element.id!));
  });

  // Retrieves the display value for a cell, handling different data types
  getCellValue(cell: InstanceCellReadDto | undefined | null): string {
    if (!cell) return '';
    if (cell.textValue !== undefined && cell.textValue !== null) return cell.textValue;
    if (cell.numberValue !== undefined && cell.numberValue !== null) return cell.numberValue.toString();
    if (cell.boolValue !== undefined && cell.boolValue !== null) return cell.boolValue ? 'True' : 'False';
    if (cell.dateValue !== undefined && cell.dateValue !== null) return new Date(cell.dateValue).toLocaleDateString();
    return '';
  }

  // Date filter function for the end date picker, ensuring it's not before the start date
  endDateFilter = (d: Date | null): boolean => {
    const startDate = this.startDate();
    return startDate ? (d || new Date()) >= startDate : true;
  };

  // Generates a PDF report from the HTML content of the report preview
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