import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PMopedComponent } from './p-moped.component';

describe('PMopedComponent', () => {
  let component: PMopedComponent;
  let fixture: ComponentFixture<PMopedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PMopedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PMopedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
