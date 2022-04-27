import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentInformationComponent } from './assessment-information.component';

describe('AssessmentInformationComponent', () => {
  let component: AssessmentInformationComponent;
  let fixture: ComponentFixture<AssessmentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
