import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScootyDetailComponent } from './scooty-detail.component';

describe('ScootyDetailComponent', () => {
  let component: ScootyDetailComponent;
  let fixture: ComponentFixture<ScootyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScootyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScootyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
