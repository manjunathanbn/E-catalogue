import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PScootyComponent } from './p-scooty.component';

describe('PScootyComponent', () => {
  let component: PScootyComponent;
  let fixture: ComponentFixture<PScootyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PScootyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PScootyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
