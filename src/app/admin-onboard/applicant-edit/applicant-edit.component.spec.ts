import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantEditComponent } from './applicant-edit.component';

describe('ApplicantEditComponent', () => {
  let component: ApplicantEditComponent;
  let fixture: ComponentFixture<ApplicantEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
