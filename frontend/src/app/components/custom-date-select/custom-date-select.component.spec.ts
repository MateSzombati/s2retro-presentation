import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateSelectComponent } from './custom-date-select.component';

describe('CustomDateSelectComponent', () => {
  let component: CustomDateSelectComponent;
  let fixture: ComponentFixture<CustomDateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDateSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
