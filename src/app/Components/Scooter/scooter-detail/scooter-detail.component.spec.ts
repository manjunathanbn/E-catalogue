import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScooterDetailComponent } from './scooter-detail.component';

describe('ScooterDetailComponent', () => {
  let component: ScooterDetailComponent;
  let fixture: ComponentFixture<ScooterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScooterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScooterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
