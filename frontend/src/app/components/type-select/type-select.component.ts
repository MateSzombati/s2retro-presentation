import { CommonModule } from '@angular/common';
import { Component, forwardRef, ElementRef, HostListener  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-type-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './type-select.component.html',
  styleUrl: './type-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeSelectComponent),
      multi: true
    }
  ]
})
export class TypeSelectComponent implements ControlValueAccessor {

  types = ['Freitext', 'Zahl', 'Datum', 'MoodSelect', 'Kategorie'];
  selectedType = '';
  dropdownOpen = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedType = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // implement if needed
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectType(type: string) {
    this.selectedType = type;
    this.dropdownOpen = false;
    this.onChange(type);
    this.onTouched();
    console.log(this.selectedType);
  }

  get displayText(): string {
    return this.selectedType || 'Select Type';
  }

  onAddType(event: Event) {
    event.stopPropagation();
    console.log('Add Type clicked');
    this.dropdownOpen = false;
  }


  
  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

}
