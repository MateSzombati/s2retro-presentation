import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-custom-date-select',
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './custom-date-select.component.html',
  styleUrl: './custom-date-select.component.css'
})
export class CustomDateSelectComponent {

  @Input() datePlaceholder = "";
  @Output() selectDate = new EventEmitter();

  onDateSelected(date: MatDatepickerInputEvent<any,any>) {
    this.selectDate.emit(date);
  }


  ngAfterViewInit() {
    
  }
}

