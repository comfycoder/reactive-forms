import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Product, Item } from '../stock-inventory/models/product.interface';

@Injectable()
export class StockInventoryService {

  constructor(
    private http: Http
  ) { }

  getCartItems(): Observable<Item[]> {
    return this.http
      .get('http://localhost:3000/cart')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get('http://localhost:3000/products')
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  checkBranchId(id: string): Observable<boolean> {
    const search = new URLSearchParams();
    search.set('id', id);
    return this.http
      .get('http://localhost:3000/branches', { search })
      .map((response: Response) => response.json())
      .map((response: any[]) => !!response.length)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
