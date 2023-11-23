import { TestBed } from '@angular/core/testing';

import { FormMClienteService } from './form-mcliente.service';

describe('FormMClienteService', () => {
  let service: FormMClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
