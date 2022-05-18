import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllocationComponent } from './list-allocation.component';

describe('ListAllocationComponent', () => {
  let component: ListAllocationComponent;
  let fixture: ComponentFixture<ListAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
