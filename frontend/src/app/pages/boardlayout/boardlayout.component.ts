import { Component, Input } from '@angular/core';
import { AddEditBoardlayoutComponent } from '../../components/add-edit-boardlayout/add-edit-boardlayout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-boardlayout',
  imports: [AddEditBoardlayoutComponent, CommonModule],
  templateUrl: './boardlayout.component.html',
  styleUrl: './boardlayout.component.scss'
})
export class BoardlayoutComponent {
  zoomLevel = 1;
  zoomLevelDisplay = Math.round(this.zoomLevel*100);
  displayEditLayout = false;

  items = [
    { id: 101, name: 'layout1', columns: 5 },
    { id: 102, name: 'layout2', columns: 7 },
    { id: 103, name: 'layout3', columns: 6 },
  ];

  onRowClick(index: number) {
    console.log('Row clicked at index:', index);
    console.log('Item:', this.items[index]);
    this.displayEditLayout = true;
  }


  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 1.3000000000000003);
    this.zoomLevelDisplay = Math.round(this.zoomLevel*100);
    console.log(this.zoomLevel);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5000000000000001);
    this.zoomLevelDisplay = Math.round(this.zoomLevel*100);
    console.log(this.zoomLevel);
  }

  selectAllText(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.select();
  }

  goBack(){
    this.displayEditLayout = false;
  }



}
