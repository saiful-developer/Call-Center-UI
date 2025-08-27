import { TestBed } from '@angular/core/testing';

import { TestAPI } from './test-api';

describe('TestAPI', () => {
  let service: TestAPI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAPI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
