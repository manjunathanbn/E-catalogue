import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackEntryHomeComponent } from './feedback-entry-home.component';

describe('FeedbackEntryHomeComponent', () => {
  let component: FeedbackEntryHomeComponent;
  let fixture: ComponentFixture<FeedbackEntryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackEntryHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackEntryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
