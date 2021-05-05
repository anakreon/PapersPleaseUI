import { TestBed } from '@angular/core/testing';

import { GameUserService } from './game-user.service';

describe('GameUserService', () => {
  let service: GameUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
