import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoapplicantViewComponent } from './coapplicant-view.component';

describe('CoapplicantViewComponent', () => {
  let component: CoapplicantViewComponent;
  let fixture: ComponentFixture<CoapplicantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoapplicantViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoapplicantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
