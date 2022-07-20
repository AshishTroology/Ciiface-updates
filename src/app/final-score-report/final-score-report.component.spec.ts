import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalScoreReportComponent } from './final-score-report.component';

describe('FinalScoreReportComponent', () => {
  let component: FinalScoreReportComponent;
  let fixture: ComponentFixture<FinalScoreReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalScoreReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalScoreReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
