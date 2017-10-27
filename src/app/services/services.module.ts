import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlickrService } from './flickr.service';
import { SpinnerService } from './spinner.service';
import { StockInventoryService } from './stock-inventory.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        FlickrService,
        SpinnerService,
        StockInventoryService
      ]
    };
  }
}
