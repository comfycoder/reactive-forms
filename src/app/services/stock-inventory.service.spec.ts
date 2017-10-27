import { TestBed, inject } from '@angular/core/testing';

import { StockInventoryService } from './stock-inventory.service';

describe('StockInventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockInventoryService]
    });
  });

  it('should be created', inject([StockInventoryService], (service: StockInventoryService) => {
    expect(service).toBeTruthy();
  }));
});
