import { TestBed, inject } from '@angular/core/testing';

import { SuperSignalListService } from './super-signal-list.service';

describe('SuperSignalListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperSignalListService]
    });
  });

  it('should be created', inject([SuperSignalListService], (service: SuperSignalListService) => {
    expect(service).toBeTruthy();
  }));
});
