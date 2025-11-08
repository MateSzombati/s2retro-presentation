import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BoardReadDto, BoardService, InstanceReadDto, InstanceColumnReadDto, InstanceRowReadDto } from '../../swagger';
import { jsPDF } from 'jspdf';
import {FormsModule} from '@angular/forms';

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

  // Data properties
  private allBoards: BoardReadDto[] = [];
  
  // View-bound properties
  filteredBoards: BoardReadDto[] = [];
  filteredInstances: InstanceReadDto[] = [];
  selectedInstanceElements: (InstanceColumnReadDto | InstanceRowReadDto)[] = [];

  // State properties
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedBoard: BoardReadDto | null = null;
  selectedInstance: InstanceReadDto | null = null;
  onlyClosed = false;
  checkedElements: Set<string> = new Set();

  ngOnInit(): void {
    this.boardService.apiBoardGet().subscribe(boards => {
      this.allBoards = boards;
      this.filteredBoards = [...this.allBoards]; // Initially, show all boards
    });
  }

  onDateChange(): void {
    if (this.startDate && this.endDate) {
      if (this.startDate > this.endDate) {
        this.endDate.setTime(this.startDate.getTime());
      }

      const start = this.startDate.getTime();
      const end = this.endDate.getTime();

      this.filteredBoards = this.allBoards.filter(board => 
        board.instances?.some(instance => {
          if (instance.entryPhaseStart) {
            const instanceDate = new Date(instance.entryPhaseStart).getTime();
            return instanceDate >= start && instanceDate <= end;
          }
          return false;
        })
      );

    } else {
      this.filteredBoards = [...this.allBoards];
    }

    if (this.selectedBoard && !this.filteredBoards.find(b => b.id === this.selectedBoard?.id)) {
      this.selectedBoard = null;
      this.selectedInstance = null;
      this.filteredInstances = [];
      this.selectedInstanceElements = [];
      this.checkedElements.clear();
    }
  }

  onBoardSelectionChange(): void {
    this.selectedInstance = null; // Reset instance selection
    this.selectedInstanceElements = []; // Clear elements
    this.checkedElements.clear(); // Clear checked elements
    if (this.selectedBoard && this.selectedBoard.instances) {
      this.filteredInstances = [...this.selectedBoard.instances];
    } else {
      this.filteredInstances = [];
    }
  }

  onInstanceSelectionChange(): void {
    this.selectedInstanceElements = []; // Clear previous elements
    this.checkedElements.clear(); // Clear previous checked elements

    if (this.selectedInstance) {
      if (this.selectedInstance.columns) {
        this.selectedInstanceElements.push(...this.selectedInstance.columns);
      }
      if (this.selectedInstance.rows) {
        this.selectedInstanceElements.push(...this.selectedInstance.rows);
      }
    }
  }

  toggleElementSelection(elementId: string): void {
    if (this.checkedElements.has(elementId)) {
      this.checkedElements.delete(elementId);
    }
    else {
      this.checkedElements.add(elementId);
    }
  }

  getElementType(element: InstanceColumnReadDto | InstanceRowReadDto): string {
    return (element as InstanceColumnReadDto).type !== undefined ? 'Column' : 'Row';
  }

  getElementName(element: InstanceColumnReadDto | InstanceRowReadDto): string {
    return (element as any).name || 'Row';
  }

  generateReport() {
    const doc = new jsPDF();
    let yPos = 10;

    doc.text('Controlling Report', 10, yPos);
    yPos += 10;

    doc.text(`Date Range: ${this.startDate?.toLocaleDateString() || 'N/A'} - ${this.endDate?.toLocaleDateString() || 'N/A'}`, 10, yPos);
    yPos += 10;

    doc.text(`Board: ${this.selectedBoard?.name || 'N/A'}`, 10, yPos);
    yPos += 10;

    doc.text(`Instance: ${this.selectedInstance?.name || 'N/A'}`, 10, yPos);
    yPos += 10;

    doc.text('Selected Elements:', 10, yPos);
    yPos += 10;

    const selectedElements = this.selectedInstanceElements.filter(element => this.checkedElements.has(element.id!));

    if (selectedElements.length > 0) {
      selectedElements.forEach(element => {
        doc.text(`- ${(element as any).name || 'Row'} (${this.getElementType(element)})`, 15, yPos);
        yPos += 7;
      });
    } else {
      doc.text('No elements selected.', 15, yPos);
      yPos += 7;
    }

    doc.save('controlling_report.pdf');
  }
}
