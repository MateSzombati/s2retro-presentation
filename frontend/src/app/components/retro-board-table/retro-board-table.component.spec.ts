import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroBoardTableComponent } from './retro-board-table.component';

describe('RetroBoardTableComponent', () => {
  let component: RetroBoardTableComponent;
  let fixture: ComponentFixture<RetroBoardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetroBoardTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetroBoardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
