import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavApplicantComponent } from './sidenav-applicant.component';

describe('SidenavApplicantComponent', () => {
  let component: SidenavApplicantComponent;
  let fixture: ComponentFixture<SidenavApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavApplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
