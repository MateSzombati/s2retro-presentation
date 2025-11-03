import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTypesDialogComponent } from './manage-types-dialog.component';

describe('ManageTypesDialogComponent', () => {
  let component: ManageTypesDialogComponent;
  let fixture: ComponentFixture<ManageTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTypesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
