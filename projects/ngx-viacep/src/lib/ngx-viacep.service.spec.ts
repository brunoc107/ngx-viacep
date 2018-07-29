import { TestBed, inject } from '@angular/core/testing';

import { NgxViacepService } from './ngx-viacep.service';

describe('NgxViacepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxViacepService]
    });
  });

  it('should be created', inject([NgxViacepService], (service: NgxViacepService) => {
    expect(service).toBeTruthy();
  }));
});
