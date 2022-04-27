import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAssessorsComponent } from './sidenav-assessors.component';

describe('SidenavAssessorsComponent', () => {
  let component: SidenavAssessorsComponent;
  let fixture: ComponentFixture<SidenavAssessorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavAssessorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavAssessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
