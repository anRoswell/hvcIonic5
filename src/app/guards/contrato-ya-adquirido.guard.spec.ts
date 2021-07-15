import { TestBed } from '@angular/core/testing';

import { ContratoYaAdquiridoGuard } from './contrato-ya-adquirido.guard';

describe('ContratoYaAdquiridoGuard', () => {
  let guard: ContratoYaAdquiridoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContratoYaAdquiridoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
