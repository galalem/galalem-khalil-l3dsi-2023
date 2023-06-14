import { TestBed } from '@angular/core/testing';

import { PageCommonService } from './page-common.service';

describe('PageCommonService', () => {
  let service: PageCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
