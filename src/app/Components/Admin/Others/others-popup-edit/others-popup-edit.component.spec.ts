import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersPopupEditComponent } from './others-popup-edit.component';

describe('OthersPopupEditComponent', () => {
  let component: OthersPopupEditComponent;
  let fixture: ComponentFixture<OthersPopupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersPopupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersPopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
