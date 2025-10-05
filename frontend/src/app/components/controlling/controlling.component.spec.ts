import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllingComponent } from './controlling.component';

describe('ControllingComponent', () => {
  let component: ControllingComponent;
  let fixture: ComponentFixture<ControllingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControllingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
