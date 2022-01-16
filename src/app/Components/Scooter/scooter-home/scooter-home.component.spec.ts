import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterHomeComponent } from './scooter-home.component';

describe('ScooterHomeComponent', () => {
  let component: ScooterHomeComponent;
  let fixture: ComponentFixture<ScooterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
