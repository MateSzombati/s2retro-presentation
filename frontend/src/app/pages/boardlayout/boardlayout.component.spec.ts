import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardlayoutComponent } from './boardlayout.component';

describe('BoardlayoutComponent', () => {
  let component: BoardlayoutComponent;
  let fixture: ComponentFixture<BoardlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
