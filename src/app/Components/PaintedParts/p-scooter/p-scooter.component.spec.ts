import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PScooterComponent } from './p-scooter.component';

describe('PScooterComponent', () => {
  let component: PScooterComponent;
  let fixture: ComponentFixture<PScooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PScooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PScooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
