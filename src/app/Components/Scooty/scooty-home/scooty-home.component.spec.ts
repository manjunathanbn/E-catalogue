import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScootyHomeComponent } from './scooty-home.component';

describe('ScootyHomeComponent', () => {
  let component: ScootyHomeComponent;
  let fixture: ComponentFixture<ScootyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScootyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScootyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
