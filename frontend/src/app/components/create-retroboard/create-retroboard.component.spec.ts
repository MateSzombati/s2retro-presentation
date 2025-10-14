import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRetroboardComponent } from './create-retroboard.component';

describe('CreateRetroboardComponent', () => {
  let component: CreateRetroboardComponent;
  let fixture: ComponentFixture<CreateRetroboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRetroboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRetroboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
