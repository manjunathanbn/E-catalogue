import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterHomeComponent } from './cluster-home.component';

describe('ClusterHomeComponent', () => {
  let component: ClusterHomeComponent;
  let fixture: ComponentFixture<ClusterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
