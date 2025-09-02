import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoardlayoutComponent } from './add-edit-boardlayout.component';

describe('AddEditBoardlayoutComponent', () => {
  let component: AddEditBoardlayoutComponent;
  let fixture: ComponentFixture<AddEditBoardlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBoardlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBoardlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
