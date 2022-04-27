import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorsViewComponent } from './assessors-view.component';

describe('AssessorsViewComponent', () => {
  let component: AssessorsViewComponent;
  let fixture: ComponentFixture<AssessorsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
