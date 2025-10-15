import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { of } from 'rxjs';

interface Layout {
  value: string;
  label: string;
  filters: string[];
}

@Component({
  selector: 'app-controlling',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  form = new FormGroup({
    startDate: new FormControl(new Date()),
    endDate: new FormControl(new Date()),
    onlyClosed: new FormControl(false),
    layout: new FormControl<string | null>(null),
    filters: new FormControl('')
  });

  layouts: Layout[] = [];
  filterPlaceholder = 'Select a layout to see available filters';

  ngOnInit(): void {
    this.getLayouts();
    this.onLayoutChange();
  }

  getLayouts(): void {
    // Simulate fetching layouts from a service
    of([
      { value: 'board-layout', label: 'Board Layout', filters: ['Author', 'Date', 'Votes'] },
      { value: 'compact', label: 'Compact', filters: ['Author', 'Date'] },
      { value: 'detailed', label: 'Detailed', filters: ['Author', 'Date', 'Votes', 'Content'] }
    ]).subscribe(layouts => {
      this.layouts = layouts;
      if (this.layouts.length > 0) {
        this.form.get('layout')?.setValue(this.layouts[0].value);
      }
    });
  }

  onLayoutChange(): void {
    this.form.get('layout')?.valueChanges.subscribe(layoutValue => {
      const selectedLayout = this.layouts.find(l => l.value === layoutValue);
      if (selectedLayout) {
        this.filterPlaceholder = `Available filters: ${selectedLayout.filters.join(', ')}`;
      } else {
        this.filterPlaceholder = 'Select a layout to see available filters';
      }
      this.form.get('filters')?.setValue('');
    });
  }

  generateReport() {
    console.log('Form submitted:', this.form.value);
  }
}
