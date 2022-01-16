import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsSelectComponent } from './parts-select.component';

describe('PartsSelectComponent', () => {
  let component: PartsSelectComponent;
  let fixture: ComponentFixture<PartsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
