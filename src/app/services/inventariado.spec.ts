import { TestBed } from '@angular/core/testing';

import { Inventariado } from './inventariado';

describe('Inventariado', () => {
  let service: Inventariado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Inventariado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
