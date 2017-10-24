import { TestBed, inject } from '@angular/core/testing';

import { PortfoliosService } from './portfolios.service';

describe('PortfoliosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfoliosService]
    });
  });

  it('should be created', inject([PortfoliosService], (service: PortfoliosService) => {
    expect(service).toBeTruthy();
  }));
});
