import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRetroBoardComponent } from './create-retro-board.component';

describe('CreateRetroBoardComponent', () => {
  let component: CreateRetroBoardComponent;
  let fixture: ComponentFixture<CreateRetroBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRetroBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRetroBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
