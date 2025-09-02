import { Component } from '@angular/core';

@Component({
  selector: 'app-freetext',
  imports: [],
  templateUrl: './freetext.component.html',
  styleUrl: './freetext.component.scss'
})
export class FreetextComponent {
  columntext = '';

  autoGrow(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }



}
