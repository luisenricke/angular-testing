import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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

  constructor(
    private productsService: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe((products) => {
      this.products = [...this.products, ...products];
      this.offset += this.limit;
      this.status = 'success';
    });
  }
}
