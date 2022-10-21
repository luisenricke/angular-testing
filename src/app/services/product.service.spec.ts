import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';

import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
import { generateManyProducts } from '../models/product.mock';

describe('ProductService', () => {
  let productsService: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productsService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('Test for getAllSimple', () => {
    it('should return a product list', (doneFn) => {
      // arrange
      const mock: Product[] = generateManyProducts(2);
      // act
      productsService.getAllSimple().subscribe((data: Product[]) => {
        // assert
        expect(data.length).toEqual(mock.length);
        expect(data).toEqual(mock);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      httpController.verify();
    });
  });
});
