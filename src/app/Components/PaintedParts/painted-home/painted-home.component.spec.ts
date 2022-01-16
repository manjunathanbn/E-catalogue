import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintedHomeComponent } from './painted-home.component';

describe('PaintedHomeComponent', () => {
  let component: PaintedHomeComponent;
  let fixture: ComponentFixture<PaintedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintedHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
