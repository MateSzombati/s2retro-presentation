import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroBoardComponent } from './retro-board.component';

describe('RetroBoardComponent', () => {
  let component: RetroBoardComponent;
  let fixture: ComponentFixture<RetroBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetroBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
