import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoapplicantComponent } from './list-coapplicant.component';

describe('ListCoapplicantComponent', () => {
  let component: ListCoapplicantComponent;
  let fixture: ComponentFixture<ListCoapplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCoapplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoapplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
