import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorsAddComponent } from './assessors-add.component';

describe('AssessorsAddComponent', () => {
  let component: AssessorsAddComponent;
  let fixture: ComponentFixture<AssessorsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
