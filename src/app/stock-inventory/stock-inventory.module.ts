import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StockInventoryComponent } from './stock-inventory.component';
import { StockBranchComponent } from './stock-branch/stock-branch.component';
import { StockProductsComponent } from './stock-products/stock-products.component';
import { StockSelectorComponent } from './stock-selector/stock-selector.component';
import { StockCounterComponent } from './stock-counter/stock-counter.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent,
    StockCounterComponent
  ],
  exports: [
    StockInventoryComponent,
    StockBranchComponent,
    StockProductsComponent,
    StockSelectorComponent,
    StockCounterComponent
  ]
})
export class StockInventoryModule { }
