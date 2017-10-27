import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { Product, Item } from './models/product.interface';

import { StockInventoryService } from '../services/stock-inventory.service';
import { StockValidators } from './stock-inventory.validators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {

  products: Product[];
  productMap: Map<number, Product>;

  total: number;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private stockInventoryService: StockInventoryService
  ) { }

  ngOnInit() {
    const cart = this.stockInventoryService.getCartItems();
    const products = this.stockInventoryService.getProducts();

    Observable
      .forkJoin(cart, products)
      .subscribe(([cart, products]: [Item[], Product[]]) => {

        const myMap = products.map<[number, Product]>(product => [product.id, product]);

        this.productMap = new Map<number, Product>(myMap);
        this.products = products;

        cart.forEach(item => this.addStock(item));

        // Calculate total at initial load
        this.calculateTotal(this.form.get('stock').value);

        // Calculate total when cart values change
        this.form.get('stock')
          .valueChanges.subscribe(value => this.calculateTotal(value));
      });

    this.createForm();
  }

  validateBranch(control: AbstractControl) {
    return this.stockInventoryService
      .checkBranchId(control.value)
      .map((response: boolean) => response ? null : { unknownBranch: true });
  }

  createForm() {
    this.form = this.fb.group({
      store: this.fb.group({
        branch: ['', [Validators.required, StockValidators.checkBranch], [this.validateBranch.bind(this)]],
        code: ['', [Validators.required]]
      }),
      selector: this.createStock({}),
      stock: this.fb.array([])
    }, { validator: StockValidators.checkStockExists });
  }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, 0);
    this.total = total;
  }

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
