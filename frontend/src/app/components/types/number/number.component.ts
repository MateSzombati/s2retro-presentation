import { Component } from '@angular/core';

@Component({
  selector: 'app-number',
  imports: [],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent {
  columntext = '';

  autoGrow(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  filterNumeric(textarea: HTMLTextAreaElement) {
    textarea.value = textarea.value.replace(/[^0-9]/g, '');
    this.autoGrow(textarea);
  }

  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

}
