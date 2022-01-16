import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintedPopupComponent } from './painted-popup.component';

describe('PaintedPopupComponent', () => {
  let component: PaintedPopupComponent;
  let fixture: ComponentFixture<PaintedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
