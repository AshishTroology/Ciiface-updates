import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaReportComponent } from './criteria-report.component';

describe('CriteriaReportComponent', () => {
  let component: CriteriaReportComponent;
  let fixture: ComponentFixture<CriteriaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
