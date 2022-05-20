import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamallocationComponent } from './teamallocation.component';

describe('TeamallocationComponent', () => {
  let component: TeamallocationComponent;
  let fixture: ComponentFixture<TeamallocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamallocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
