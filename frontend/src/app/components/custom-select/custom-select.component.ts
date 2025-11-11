import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Signal, signal, ViewChild } from '@angular/core';
import { LayoutReadDto } from '../../swagger2';

@Component({
  selector: 'app-custom-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
})
export class CustomSelectComponent {
  dropdownOpen = false;
  selectedItem: LayoutReadDto | null = null;
  // items = ['Option 1', 'Option 2', 'Option 3'];

  @Input() items!: Signal<LayoutReadDto[] | undefined>;
  @Output() select = new EventEmitter<string>();


  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectType(item: LayoutReadDto) {
    this.selectedItem = item;
    this.dropdownOpen = false;
    this.select.emit(item.id);
  }

  // Detect clicks outside
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (
      this.dropdownOpen &&
      this.dropdownContainer &&
      !this.dropdownContainer.nativeElement.contains(event.target)
    ) {
      this.dropdownOpen = false;
    }
  }
}
