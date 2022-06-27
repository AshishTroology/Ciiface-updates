import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAllocationComponent } from './edit-allocation.component';

describe('EditAllocationComponent', () => {
  let component: EditAllocationComponent;
  let fixture: ComponentFixture<EditAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
