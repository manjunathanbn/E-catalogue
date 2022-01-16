import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPopupComponent } from './other-popup.component';

describe('OtherPopupComponent', () => {
  let component: OtherPopupComponent;
  let fixture: ComponentFixture<OtherPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
