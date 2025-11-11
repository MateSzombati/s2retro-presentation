import { CommonModule } from '@angular/common';
import { Component, forwardRef, ElementRef, HostListener  } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mood',
  imports: [CommonModule, FormsModule],
  templateUrl: './mood.component.html',
  styleUrl: './mood.component.scss'
})
export class MoodComponent {
  moods = ['Glad', 'Mad', 'Sad'];
  selectedMood = '';
  dropdownOpen = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedMood = value;
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

  selectType(mood: string) {
    this.selectedMood = mood;
    this.dropdownOpen = false;
    this.onChange(mood);
    this.onTouched();
    console.log(this.selectedMood);
  }

  get displayText(): string {
    return this.selectedMood || '-';
  }



  
  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
