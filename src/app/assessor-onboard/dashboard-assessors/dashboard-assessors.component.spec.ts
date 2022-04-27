import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssessorsComponent } from './dashboard-assessors.component';

describe('DashboardAssessorsComponent', () => {
  let component: DashboardAssessorsComponent;
  let fixture: ComponentFixture<DashboardAssessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAssessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAssessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
