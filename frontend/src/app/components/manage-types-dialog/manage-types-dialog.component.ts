import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListService } from '../../shared/list.service';
import { CommonModule } from '@angular/common';
import { c } from "../../../../node_modules/@angular/cdk/a11y-module.d-DBHGyKoh";
import { FormsModule } from '@angular/forms';
import { CategoryService, CategoryReadDto, CategoryValueReadDto, CategoryValueService, CategoryCreateDto, CategoryValueCreateDto } from '../../swagger';

@Component({
  selector: 'app-manage-types-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-types-dialog.component.html',
  styleUrl: './manage-types-dialog.component.scss'
})
export class ManageTypesDialogComponent implements OnInit {

  itemClicked = false;
  typeId = "";
  typeName = '';
  categories: CategoryReadDto [] = [];
  subItems: CategoryValueReadDto[] = [];
  type: CategoryReadDto = {};
  valueToDelete: CategoryValueReadDto | null = null;

  constructor(
    public dialogRef: MatDialogRef<ManageTypesDialogComponent>,
    private listService: ListService,
    private categoryService: CategoryService,
    private valueService: CategoryValueService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    
  }


  ngOnInit(): void {
    this.categoryService.apiCategoryGet().subscribe({
      next: (x) => {
        this.categories = x;
        console.log(this.categories);
      },
      error: (err) => console.error(err)
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(selectedType: CategoryReadDto) {
    this.categoryService.apiCategoryPut(this.type).subscribe({
      next: (x) => {
        
        if(this.valueToDelete) {
          this.valueService.apiCategoryValueIdDelete(this.valueToDelete.id!).subscribe({
            next: (x) => {
              
              this.categoryService.apiCategoryGet().subscribe({
                next: (x) => {
                  this.categories = x;
                  console.log(this.categories);
                },
                error: (err) => console.error(err)
              });
              this.valueToDelete = null;

            },
            error: (err) => console.error(err)
          });
        }
        
        
      },
      error: (err) => console.log(err)
    });
  }


  addItem() {
    const newType: CategoryCreateDto = {
      name: 'New Category',
      values: [
        { name: 'New Value' },
      ],
    };

    this.categoryService.apiCategoryPost(newType).subscribe({
      next: (x) => {
        this.categoryService.apiCategoryGet().subscribe({
          next: (x) => {
            this.categories = x;
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error('Error creating category:', err)
    });
    
  }


  onItemClick(id: string) {
    this.itemClicked = true;
    this.typeId = id;
    this.type = this.categories.find(x => x.id === id)!;
    this.subItems = this.type.values!;
    this.typeName = this.type.name!;
  }

  onBack() {
    this.itemClicked = false;
    
    this.categoryService.apiCategoryGet().subscribe({
      next: (x) => {
        this.categories = x;
        this.type = this.categories.find(item => item.id === this.typeId)!;
      },
      error: (err) => console.error(err)
    });

    this.typeId = "";
    // this.type = undefined;
    this.typeName = '';
    this.subItems = [];
    this.valueToDelete = null;
  }

  addSubitem() {
    if (!this.type || this.type.id == null) return;

    const newValue: CategoryValueCreateDto = {};
    newValue.name = "New Value";

    this.type.values?.push(newValue);
    console.log(this.type);

    this.subItems = this.type.values!;

  }

  removeSubitem(subitemId: string) {
    if (!this.type || this.type.id == null) return;

    this.valueToDelete = this.type.values?.find(item => item.id === subitemId)!;

    this.subItems = this.subItems.filter(items => items.id !== subitemId);

    // this.valueService.apiCategoryValueIdDelete(subitemId).subscribe({
    //   next: (x) => {
    //     this.categoryService.apiCategoryGet().subscribe({
    //       next: (y) => {
    //         this.categories = y;
    //       },
    //       error: (err) => console.error(err)
    //     });
    //     this.type = this.categories.find(item => item.id === this.typeId)!;
    //     this.subItems = this.type.values!;
    //   },
    //   error: (err) => console.log(err)
    // });

  }



  onTypeNameChange() {
    if (!this.type) return;
    this.type.name = this.typeName;
  }

  removeType(id: string) {
    if (!this.type) return;
    
    this.categoryService.apiCategoryIdDelete(id).subscribe({
      next: (x) => {
        this.categoryService.apiCategoryGet().subscribe({
          next: (x) => {
            this.categories = x;
          },
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.log(err)
    });
  }

}