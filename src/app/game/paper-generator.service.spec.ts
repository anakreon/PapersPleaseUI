import { TestBed } from '@angular/core/testing';

import { PaperGeneratorService } from './paper-generator.service';

describe('PaperGeneratorService', () => {
  let service: PaperGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
