import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutStatusComponent } from './layout-status.component';

describe('LayoutStatusComponent', () => {
  let component: LayoutStatusComponent;
  let fixture: ComponentFixture<LayoutStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
