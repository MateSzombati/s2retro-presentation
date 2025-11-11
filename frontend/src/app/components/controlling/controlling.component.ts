import { Component, inject, OnInit } from '@angular/core';
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
  private instanceService = inject(InstanceService);

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

    if (this.selectedInstance && this.selectedInstance.id) {
      this.instanceService.apiInstanceIdGet(this.selectedInstance.id).subscribe(fullInstance => {
        this.selectedInstance = fullInstance; // Update the selected instance with full details
        if (fullInstance.columns) {
          this.selectedInstanceElements.push(...fullInstance.columns);
        }
        if (fullInstance.rows) {
          this.selectedInstanceElements.push(...fullInstance.rows);
        }
      });
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
    let yPos = 20; // Increased top margin

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Controlling Report', doc.internal.pageSize.getWidth() / 2, yPos, { align: 'center' });
    yPos += 15;

    // --- General Information ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('General Information', 14, yPos);
    yPos += 8;
    doc.setLineWidth(0.5);
    doc.line(14, yPos - 2, doc.internal.pageSize.getWidth() - 14, yPos - 2); // Underline

    const leftMargin = 14;
    const valueOffset = 50; // X-position for values

    const addInfoEntry = (label: string, value: string) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, leftMargin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, valueOffset, yPos);
      yPos += 7;
    };

    yPos += 5;
    addInfoEntry('Date Range:', `${this.startDate?.toLocaleDateString() || 'N/A'} - ${this.endDate?.toLocaleDateString() || 'N/A'}`);
    addInfoEntry('Board:', this.selectedBoard?.name || 'N/A');
    addInfoEntry('Instance:', this.selectedInstance?.name || 'N/A');
    addInfoEntry('Entry Phase Start:', this.selectedInstance?.entryPhaseStart ? new Date(this.selectedInstance.entryPhaseStart).toLocaleString() : 'N/A');
    addInfoEntry('Entry Phase End:', this.selectedInstance?.entryPhaseEnd ? new Date(this.selectedInstance.entryPhaseEnd).toLocaleString() : 'N/A');
    yPos += 5;

    // --- Selected Elements ---
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Selected Elements', 14, yPos);
    yPos += 8;
    doc.line(14, yPos - 2, doc.internal.pageSize.getWidth() - 14, yPos - 2); // Underline
    yPos += 5;

    doc.setFont('helvetica', 'normal');
    const selectedElements = this.selectedInstanceElements.filter(element => this.checkedElements.has(element.id!));

    if (selectedElements.length > 0) {
      selectedElements.forEach(element => {
        doc.text(`- ${this.getElementName(element)} (${this.getElementType(element)})`, leftMargin + 2, yPos);
        yPos += 7;
      });
    } else {
      doc.text('No elements selected.', leftMargin + 2, yPos);
      yPos += 7;
    }
    yPos += 5;

    // --- Board Overview ---
    if (this.selectedInstance && this.selectedInstance.columns && this.selectedInstance.rows) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Board Overview', 14, yPos);
      yPos += 8;
      doc.line(14, yPos - 2, doc.internal.pageSize.getWidth() - 14, yPos - 2); // Underline
      yPos += 5;

      const columnHeaders = ['Row Position', ...this.selectedInstance.columns.map(col => col.name || 'N/A')];
      const columnWidths = [30, ...this.selectedInstance.columns.map(() => (doc.internal.pageSize.getWidth() - 58) / this.selectedInstance!.columns!.length)];
      const rowHeight = 10;
      const startX = 14;
      let currentX = startX;
      const tableStartY = yPos;

      // Helper function to get cell value
      const getCellValue = (cell: InstanceCellReadDto): string => {
        if (cell.textValue !== undefined && cell.textValue !== null) return cell.textValue;
        if (cell.numberValue !== undefined && cell.numberValue !== null) return cell.numberValue.toString();
        if (cell.boolValue !== undefined && cell.boolValue !== null) return cell.boolValue ? 'True' : 'False';
        if (cell.dateValue !== undefined && cell.dateValue !== null) return new Date(cell.dateValue).toLocaleDateString();
        return '';
      };

      // Draw table headers
      doc.setFont('helvetica', 'bold');
      columnHeaders.forEach((header, index) => {
        doc.text(header, currentX + 2, yPos + rowHeight - 2, { maxWidth: columnWidths[index] - 4 });
        currentX += columnWidths[index];
      });
      yPos += rowHeight;

      // Draw table rows
      doc.setFont('helvetica', 'normal');
      this.selectedInstance.rows.forEach(row => {
        currentX = startX;
        // Check for page break
        if (yPos + rowHeight > doc.internal.pageSize.getHeight() - 10) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(row.position?.toString() || 'N/A', currentX + 2, yPos + rowHeight - 2);
        currentX += columnWidths[0];

        this.selectedInstance!.columns!.forEach((column, colIndex) => {
          const cell = row.cells?.[colIndex];
          doc.text(cell ? getCellValue(cell) : '', currentX + 2, yPos + rowHeight - 2, { maxWidth: columnWidths[colIndex + 1] - 4 });
          currentX += columnWidths[colIndex + 1];
        });
        yPos += rowHeight;
      });

      // Draw table borders
      doc.setDrawColor(0);
      doc.setLineWidth(0.2);
      // Horizontal lines
      let tempY = tableStartY;
      for (let i = 0; i <= this.selectedInstance.rows.length + 1; i++) {
        doc.line(startX, tempY, startX + columnWidths.reduce((a, b) => a + b, 0), tempY);
        tempY += rowHeight;
      }
      // Vertical lines
      let tempX = startX;
      for (let i = 0; i < columnWidths.length; i++) {
        doc.line(tempX, tableStartY, tempX, tableStartY + (this.selectedInstance.rows.length + 1) * rowHeight);
        tempX += columnWidths[i];
      }
      doc.line(tempX, tableStartY, tempX, tableStartY + (this.selectedInstance.rows.length + 1) * rowHeight); // Last vertical line
    }

    doc.save('controlling_report.pdf');
  }
}
