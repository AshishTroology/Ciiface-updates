import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssResourcesComponent } from './ass-resources.component';

describe('AssResourcesComponent', () => {
  let component: AssResourcesComponent;
  let fixture: ComponentFixture<AssResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
