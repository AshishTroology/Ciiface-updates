import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessChecklistComponent } from './assess-checklist.component';

describe('AssessChecklistComponent', () => {
  let component: AssessChecklistComponent;
  let fixture: ComponentFixture<AssessChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
