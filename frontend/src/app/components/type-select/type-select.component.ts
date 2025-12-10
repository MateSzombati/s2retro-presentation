import { CommonModule } from '@angular/common';
import { Component, forwardRef, ElementRef, ViewChild, OnInit, OnDestroy, TemplateRef, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';

import { CategoryService, CategoryReadDto } from '../../swagger';
import { ManageTypesDialogComponent } from '../manage-types-dialog/manage-types-dialog.component';

@Component({
  selector: 'app-type-select',
  imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
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
export class TypeSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {
  dropdownOpen = false;

  selectedType: CategoryReadDto | null = null;
  selectedTypeName = "";

  standardTypes = ['Text', 'Number', 'Date'];
  types: CategoryReadDto[] = [];

  @ViewChild('dropdownContainer', { read: ElementRef }) dropdownContainer!: ElementRef;
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  @Output() onTypeEdited = new EventEmitter<void>();

  private overlayRef: OverlayRef | null = null;
  private currentValue: any = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private dialog: MatDialog,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.categoryService.apiCategoryGet().subscribe({
      next: (x) => {
        this.types = x;

        this.tryApplyValue();
      },
      error: (err) => console.error(err)
    });

  }

  private tryApplyValue() {
    if (!this.currentValue) return;

    // now we are guaranteed that types are loaded
    if (this.currentValue.categoryId) {
      const found = this.types.find(t => t.id === this.currentValue.categoryId);
      if (found) {
        this.selectedType = found;
        this.selectedTypeName = found.name!;
        return;
      }
    }

    this.writeValue(this.currentValue);
  }

  ngOnDestroy(): void {
    this.closeDropdown();
  }

  writeValue(value: any): void {
    this.currentValue = value;

    if (!value) {
      this.setToText();
      return;
    }

    // If categoryId exists but types not loaded yet → retry later
    // if (value.categoryId && !this.types.length) {
    //   setTimeout(() => this.writeValue(value), 0);
    //   return;
    // }

    if (value.type !== null && value.type !== undefined) {
      this.selectedTypeName = this.standardTypes[value.type] ?? 'Text';
      this.selectedType = null;
      return;
    }

    if (value.categoryId) {
      const found = this.types.find(t => t.id === value.categoryId);
      this.selectedType = found ?? null;
      this.selectedTypeName = found?.name ?? '(Unbekannt)';
      return;
    }

    this.setToText();
  }

  private setToText() {
    this.selectedTypeName = 'Text';
    this.selectedType = null;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggleDropdown() {
    this.dropdownOpen ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    this.dropdownOpen = true;
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.dropdownContainer)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 }
      ])
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    setTimeout(() => {
      if (this.dropdownContainer && this.overlayRef) {
        const width = this.dropdownContainer.nativeElement.getBoundingClientRect().width;
        this.overlayRef.updateSize({ width: `${width}px` });
      }
    }, 0);

    this.categoryService.apiCategoryGet().subscribe({
      next: (x) => {
        this.types = x;

        this.tryApplyValue();
      },
      error: (err) => console.error(err)
    });

    const portal = new TemplatePortal(this.dropdownTemplate, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());
  }

  closeDropdown() {
    this.dropdownOpen = false;
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  selectType(name: string, item: CategoryReadDto | null): void {
    this.selectedTypeName = name;
    this.selectedType = item ?? null;

    const update = item
      ? { type: 0, categoryId: item.id, category: null }
      : { type: this.standardTypes.indexOf(name), categoryId: null, category: null };

      console.log( this.standardTypes.indexOf(name));

    this.onChange({ ...this.currentValue, ...update });

    this.onTouched();
    this.closeDropdown();

    this.onTypeEdited.emit();
  }

  openDialog(): void {
    this.closeDropdown();

    const dialogRef = this.dialog.open(ManageTypesDialogComponent, {
      width: '400px',
      height: '400px',
      backdropClass: 'custom-dialog-backdrop',
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.categoryService.apiCategoryGet().subscribe({
        next: (x) => this.types = x,
        error: (err) => console.error(err)
      });
    });
  }
}
