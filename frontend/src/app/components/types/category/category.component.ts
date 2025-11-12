import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { InstanceCategoryService } from '../../../swagger';
import { catchError, from, of } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [FormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {

  @Input() id: string | null = null;

  moods = ['Glad', 'Mad', 'Sad', 'Neutral'];
  selectedValue = '';
  dropdownOpen = false;

  private instanceCategoryService = inject(InstanceCategoryService);

  instanceCategoryId = computed(() => this.id);

  categoryRef = rxResource<any, { categoryId: string | null }>({
    request: () => ({ categoryId: this.instanceCategoryId() }),
    loader: ({ request }) => {
      if (!request.categoryId) return of(null);

      return from(
        this.instanceCategoryService.apiInstanceCategoryIdGet(request.categoryId)
      ).pipe(
        catchError((err) => {
          console.error('Error loading category:', err);
          return of(null);
        })
      );
    },
    defaultValue: null,
  });

  category = computed(() => this.categoryRef.value());

  _ = effect(() => {
    console.log('Loaded category:', this.category());
  });

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectType(value: string) {
    this.selectedValue = value;
    this.dropdownOpen = false;
    this.onChange(value);
    this.onTouched();
    console.log(this.selectedValue);
  }

  get displayText(): string {
    return this.selectedValue || '-';
  }

  constructor(private eRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }
}
