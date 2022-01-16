import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintedSubpartsComponent } from './painted-subparts.component';

describe('PaintedSubpartsComponent', () => {
  let component: PaintedSubpartsComponent;
  let fixture: ComponentFixture<PaintedSubpartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintedSubpartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintedSubpartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
