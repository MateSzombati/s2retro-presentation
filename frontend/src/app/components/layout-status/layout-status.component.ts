import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout-status',
  imports: [],
  templateUrl: './layout-status.component.html',
  styleUrl: './layout-status.component.css'
})
export class LayoutStatusComponent {
  @Input() activeLabel: string = 'Active';
  @Input() archivedLabel: string = 'Archived';
  @Input() selected: 'active' | 'archived' = 'active';

  @Output() statusChange = new EventEmitter<'active' | 'archived'>();

  select(status: 'active' | 'archived') {
    if (this.selected !== status) {
      this.selected = status;
      this.statusChange.emit(status);
    }
  }
}
