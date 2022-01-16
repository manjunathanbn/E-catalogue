import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintedDetailsComponent } from './painted-details.component';

describe('PaintedDetailsComponent', () => {
  let component: PaintedDetailsComponent;
  let fixture: ComponentFixture<PaintedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
