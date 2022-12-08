import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta = '';

  constructor(
    private productsService: ProductService,
    private valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: error => {
        setTimeout(() => {
          this.products = [];
          this.offset = 0;
          this.status = 'error';
        }, 3_000);
      }
    });
  }

  async callPromise(): Promise<void> {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}
