import { TestBed, inject } from '@angular/core/testing';

import { SignalrouselService } from './signalrousel.service';

describe('SignalrouselService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignalrouselService]
    });
  });

  it('should be created', inject([SignalrouselService], (service: SignalrouselService) => {
    expect(service).toBeTruthy();
  }));
});
