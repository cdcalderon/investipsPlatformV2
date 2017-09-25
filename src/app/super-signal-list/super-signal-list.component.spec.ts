import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSignalListComponent } from './super-signal-list.component';

describe('SuperSignalListComponent', () => {
  let component: SuperSignalListComponent;
  let fixture: ComponentFixture<SuperSignalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperSignalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSignalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
