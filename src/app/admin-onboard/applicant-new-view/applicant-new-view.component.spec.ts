import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantNewViewComponent } from './applicant-new-view.component';

describe('ApplicantNewViewComponent', () => {
  let component: ApplicantNewViewComponent;
  let fixture: ComponentFixture<ApplicantNewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantNewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantNewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
