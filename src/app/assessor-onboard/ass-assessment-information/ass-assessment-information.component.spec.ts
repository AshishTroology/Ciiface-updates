import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssAssessmentInformationComponent } from './ass-assessment-information.component';

describe('AssAssessmentInformationComponent', () => {
  let component: AssAssessmentInformationComponent;
  let fixture: ComponentFixture<AssAssessmentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssAssessmentInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssAssessmentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
