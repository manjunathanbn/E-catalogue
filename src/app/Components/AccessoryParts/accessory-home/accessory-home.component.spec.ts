import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoryHomeComponent } from './accessory-home.component';

describe('AccessoryHomeComponent', () => {
  let component: AccessoryHomeComponent;
  let fixture: ComponentFixture<AccessoryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessoryHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
