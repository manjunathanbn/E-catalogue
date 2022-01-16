import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMotorComponent } from './p-motor.component';

describe('PMotorComponent', () => {
  let component: PMotorComponent;
  let fixture: ComponentFixture<PMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
