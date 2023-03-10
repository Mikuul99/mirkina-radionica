import { TestBed } from '@angular/core/testing';

import { InstagramMediaService } from './instagram-media.service';

describe('InstagramMediaService', () => {
  let service: InstagramMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstagramMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
