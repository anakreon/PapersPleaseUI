import { TestBed } from '@angular/core/testing';

import { ApprovalAdapterService } from './approval-adapter.service';

describe('ApprovalAdapterService', () => {
  let service: ApprovalAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
