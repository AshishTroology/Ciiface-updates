import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHighestScoreComponent } from './add-highest-score.component';

describe('AddHighestScoreComponent', () => {
  let component: AddHighestScoreComponent;
  let fixture: ComponentFixture<AddHighestScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHighestScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHighestScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
