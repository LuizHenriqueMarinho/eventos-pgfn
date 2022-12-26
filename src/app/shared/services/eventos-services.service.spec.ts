import { TestBed } from '@angular/core/testing';

import { EventosServicesService } from './eventos-services.service';

describe('EventosServicesService', () => {
  let service: EventosServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
