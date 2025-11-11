import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-freetext',
  imports: [],
  templateUrl: './freetext.component.html',
  styleUrl: './freetext.component.scss'
})
export class FreetextComponent implements OnChanges {
  columntext = '';

  @Output() heightChange = new EventEmitter<number>();
  @Input() rowHeight!: number;

  @ViewChild('freetext') textarea!: ElementRef<HTMLTextAreaElement>;

  lastHeightChange = 70;
  @Input() isLargest!: boolean;


  autoGrow(textarea: HTMLTextAreaElement) {
    // if(this.lastHeightChange < textarea.scrollHeight){
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
      this.heightChange.emit(textarea.scrollHeight);
    // }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.textarea && changes['rowHeight']) {
      const el = this.textarea.nativeElement;
      el.style.height = changes['rowHeight'].currentValue + 'px';
      console.log('Row height changed:', changes['rowHeight'].currentValue);
      this.lastHeightChange = changes['rowHeight'].currentValue;
    }
  }

  changeIsLargest(changes: SimpleChanges) {
    if(changes['isLargest']) {
      console.log(changes['isLargest'].currentValue);
    }
  }


  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  


}
