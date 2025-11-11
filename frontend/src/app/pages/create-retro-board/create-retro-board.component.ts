import { Component, computed, inject } from '@angular/core';
import { CustomSelectComponent } from "../../components/custom-select/custom-select.component";
import { CustomDateSelectComponent } from "../../components/custom-date-select/custom-date-select.component";
import { CategoryService, LayoutReadDto, LayoutService } from '../../swagger2';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";
import { BoardService, BoardCreateDto, InstanceCreateDto, InstanceService } from '../../swagger';
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
        this.requestCreateBoard();
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
        this.requestCreateBoard();
      }

    }


    

    
    
  }

  requestCreateBoard() {

    // this.categoryService.apiCategoryIdGet().subscribe({
    //   next: (x) => {

    //   },
    //   error: (err) => console.log(err)
    // });

    this.layoutService.apiLayoutIdGet(this.selectedLayoutId).subscribe({
      next: (x) => {
        const columns = x.columns?.map(c => ({
          position: c.position,
          name: c.name,
          type: c.type,
          
        }))
      },
      error: (err) => console.log(err)
    });




    const newBoard: BoardCreateDto = {
    name: this.boardName,
    instances: [
      {
        name: this.boardName,
        entryPhaseStart: this.selectedStartDate,
        entryPhaseEnd: this.selectedEndDate,
        phase: 0,
        columns: [
          { position: 1, name: 'Went well', type: 0, },
          { position: 2, name: 'Didn’t go well', type: 0, },
          { position: 3, name: 'Actions', type: 0, }
        ],
        rows: [
          { position: 1, cells: [] },
          { position: 2, cells: [] }
        ]
      }
    ]
  };

  this.boardService.apiBoardPost(newBoard).subscribe({
    next: (id) => console.log('Board created successfully:', id),
    error: (err) => console.error('Backend validation error:', err.error)
  });





    // const newBoard: BoardCreateDto = {
    //   name: this.boardName,
    // };

    // this.boardService.apiBoardPost(newBoard).subscribe({
    //   next: (x) => {
    //     this.createdBoardId = x;






    //     const newInstance: InstanceCreateDto = {
    //       name: this.boardName,
    //       entryPhaseStart: this.selectedStartDate,
    //       entryPhaseEnd: this.selectedEndDate,
    //       phase: 0,
    //       boardId: this.createdBoardId,

    //     };

    //     this.InstanceService.apiInstancePost(newInstance).subscribe({
    //       next: (y) => {
    //         this.router.navigateByUrl(`retroboard/${y}`)
    //       },
    //       error: (err) => console.log(err)
    //     });

    //   },
    //   error: (err) => console.log(err)
    // });
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
