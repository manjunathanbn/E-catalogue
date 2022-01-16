import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumablesHomeComponent } from './consumables-home.component';

describe('ConsumablesHomeComponent', () => {
  let component: ConsumablesHomeComponent;
  let fixture: ComponentFixture<ConsumablesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumablesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumablesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
