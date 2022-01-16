import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintedDetailComponent } from './painted-detail.component';

describe('PaintedDetailComponent', () => {
  let component: PaintedDetailComponent;
  let fixture: ComponentFixture<PaintedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaintedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
