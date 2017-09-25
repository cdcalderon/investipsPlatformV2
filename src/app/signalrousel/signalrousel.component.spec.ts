import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalrouselComponent } from './signalrousel.component';

describe('SignalrouselComponent', () => {
  let component: SignalrouselComponent;
  let fixture: ComponentFixture<SignalrouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalrouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
