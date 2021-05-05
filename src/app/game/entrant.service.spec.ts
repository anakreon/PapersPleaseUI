import { TestBed } from '@angular/core/testing';

import { EntrantService } from './entrant.service';

describe('EntrantService', () => {
  let service: EntrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
