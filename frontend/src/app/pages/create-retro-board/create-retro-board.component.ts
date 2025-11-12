import { Component, computed, inject } from '@angular/core';
import { CustomSelectComponent } from "../../components/custom-select/custom-select.component";
import { CustomDateSelectComponent } from "../../components/custom-date-select/custom-date-select.component";
import { CategoryService, CategoryValueService, LayoutReadDto, LayoutService } from '../../swagger2';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";
import { BoardService, BoardCreateDto, InstanceCreateDto, InstanceService, InstanceColumnCreateDto, InstanceCategoryCreateDto, InstanceCategoryValueCreateDto, InstanceCategoryService } from '../../swagger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-retro-board',
  imports: [CustomSelectComponent, CustomDateSelectComponent, FormsModule],
  templateUrl: './create-retro-board.component.html',
  styleUrl: './create-retro-board.component.css'
})
export class CreateRetroBoardComponent {

  boardName = "";
  selectedStartDate = "";
  selectedEndDate = "";
  selectedLayoutId: string = ""; 

  createdBoardId: string = "";

  layoutService = inject(LayoutService);
  boardService = inject(BoardService);
  categoryService = inject(CategoryService);
  categoryValueService = inject(CategoryValueService);
  InstanceService = inject(InstanceService);


  router = inject(Router);

  layoutsRef = rxResource({
    loader: () => this.layoutService.apiLayoutGet()
  });
  layouts = computed(() => this.layoutsRef.value());

  createBoard() {

    if(this.boardName && this.selectedLayoutId) {
      
      if(this.selectedStartDate && this.selectedEndDate) {
        console.log(`${this.boardName} - ${this.selectedStartDate} - ${this.selectedEndDate} - ${this.selectedLayoutId}`);
        this.loadSelectedLayoutAndCreateBoard();
      }
      else {
        if(!this.selectedStartDate) {
          this.selectedStartDate = new Date().toISOString();
        }
        if(!this.selectedEndDate) {
          const today = new Date();
          const threeWeeksLater = new Date(today);
          threeWeeksLater.setDate(today.getDate() + 21);
          this.selectedEndDate = threeWeeksLater.toISOString();
        }
        console.log(`${this.boardName} - ${this.selectedStartDate} - ${this.selectedEndDate} - ${this.selectedLayoutId}`);
        this.loadSelectedLayoutAndCreateBoard();
      }

    }

  }


  loadSelectedLayoutAndCreateBoard(): void {
    if (!this.selectedLayoutId) {
      console.warn('No layout selected.');
      return;
    }

    // GET single layout by ID
    this.layoutService.apiLayoutIdGet(this.selectedLayoutId).subscribe({
      next: (layout) => {
        console.log('Fetched layout:', layout);

        this.createBoardFromLayout(layout);
      },
      error: (err) => console.error('Error fetching layout:', err)
    });
  }

  private createBoardFromLayout(layout: LayoutReadDto): void {
    if (!layout) {
      console.warn('Layout not found.');
      return;
    }

    const newBoard: BoardCreateDto = {
      name: this.boardName,
      instances: [
        {
          name: this.boardName,
          entryPhaseStart: this.selectedStartDate,
          entryPhaseEnd: this.selectedEndDate,
          phase: 0,
          columns: layout.columns?.map((col, index) => ({
            position: index,
            name: col.name ?? 'Untitled',
            type: col.type ?? 0,
            // instanceCategoryId: col.categoryId,
            category: col.category
              ? {
                  name: col.category.name,
                  values:
                    col.category.values?.map((v) => ({
                      name: v.name,
                    })) ?? [],
                }
              : undefined,
          })) ?? [],
          rows: [
            { position: 1, cells: [] },
            { position: 2, cells: [] },
          ],
        },
      ],
    };

    this.boardService.apiBoardPost(newBoard).subscribe({
      next: (id) => {
        console.log('Board created successfully:', id);
        this.router.navigateByUrl(`retroboard/${id}`);
      },
      error: (err) => console.error('Error creating board:', err.error),
    });

    console.log('POST Board');
    console.log(newBoard);
  }


  onLayoutSelect(id: string) {
    this.selectedLayoutId = id;
  }

  onAddUser() {
    
  }

  onSelectEndDate(date: any) {
    this.selectedStartDate = date.value?.toISOString();
  }
  onSelectStartDate(date: any) {
    this.selectedEndDate = date.value?.toISOString();
  }

}
