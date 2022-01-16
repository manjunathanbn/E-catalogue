import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuuploadPopupComponent } from './menuupload-popup.component';

describe('MenuuploadPopupComponent', () => {
  let component: MenuuploadPopupComponent;
  let fixture: ComponentFixture<MenuuploadPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuuploadPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuuploadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
