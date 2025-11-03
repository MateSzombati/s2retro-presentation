import { Component, Input } from '@angular/core';
import { AddEditBoardlayoutComponent } from '../../components/add-edit-boardlayout/add-edit-boardlayout.component';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutRowComponent } from '../../components/layout-row/layout-row.component';
import { ListService } from '../../shared/list.service';
import { Observable } from 'rxjs';
import { LayoutReadDto, LayoutService, LayoutCreateDto } from '../../swagger';
import { LayoutStatusComponent } from "../../components/layout-status/layout-status.component";

@Component({
  selector: 'app-boardlayout',
  standalone: true,
  imports: [CommonModule, LayoutRowComponent, NgFor, LayoutStatusComponent],
  templateUrl: './boardlayout.component.html',
  styleUrl: './boardlayout.component.scss'
})
export class BoardlayoutComponent {

  zoomLevel = 1;
  zoomLevelDisplay = Math.round(this.zoomLevel*100);

  dropdownOpen = false;

  columns = ['name', 'columns', 'action'];

  layouts: LayoutReadDto[] = [];

  archivedView = false;
  
  constructor(
    private listService: ListService,
    private layoutService: LayoutService,
  ) {}

  ngOnInit() {
    // this.layouts = [
    //   { name: 'Retro Layout 8-Spaltig'},
    //   { name: 'Board Layout 5-Spaltig'},
    //   { name: 'Board Layout 6-Spaltig'}
    // ];

    this.reloadLayouts();


  }

  onStatusChange(layoutStatus: string) {
    if(layoutStatus === "active") {
      this.archivedView = false;
      this.layoutService.apiLayoutGet().subscribe({
        next: (x) => {
          this.layouts = x;
          this.layouts = this.layouts.filter(x => x.isArchived !== true);
        },
        error: (err) => console.error(err)
      });
    }
    if(layoutStatus === "archived") {
      this.archivedView = true;
      this.layoutService.apiLayoutGet().subscribe({
        next: (x) => {
          this.layouts = x;
          this.layouts = this.layouts.filter(x => x.isArchived !== false);
        },
        error: (err) => console.error(err)
      });
    }
  }

  reloadLayouts() {
    this.layoutService.apiLayoutGet().subscribe({
      next: (x) => {
        this.layouts = x;
        if(this.archivedView === false) {
          this.layouts = this.layouts.filter(x => x.isArchived !== true);
        }
        else {
          this.layouts = this.layouts.filter(x => x.isArchived !== false);
        }
      },
      error: (err) => console.error(err)
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  addLayout() {
    const newLayout: LayoutCreateDto = {
      name: "New Layout",
      columns: [
        {
          name: "New Column",
          type: 0,
        }
      ]
    };

    this.layoutService.apiLayoutPost(newLayout).subscribe({
      next: (x) => {
        this.reloadLayouts();
      },
      error: (err) => console.error(err)
    });

  }


  // items = [
  //   { id: 101, name: 'layout1', columns: 5 },
  //   { id: 102, name: 'layout2', columns: 7 },
  //   { id: 103, name: 'layout3', columns: 6 },
  // ];

  

  



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



}
