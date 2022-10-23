import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from '../models/product.mock';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';
import { ProductsService } from './products.service';

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

  afterEach(() => {
    httpController.verify();
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
    });
  });

  describe('Test for getAll', () => {
    it('should return a product list', (doneFn) => {
      // arrange
      const mock: Product[] = generateManyProducts(3);
      // act
      productsService.getAll().subscribe((data: Product[]) => {
        // assert
        expect(data.length).toEqual(mock.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mock);
    });

    it('should return a product list with taxes', (doneFn) => {
      // arrange
      const mock: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, // 100 * .19 = 19
        },
        {
          ...generateOneProduct(),
          price: 200, // 200 * .19 = 38
        },
        {
          ...generateOneProduct(),
          price: 0, // 0 * .19 = 0
        },
        {
          ...generateOneProduct(),
          price: -10, // -10 * .19 = 0
        },
      ];
      // act
      productsService.getAll().subscribe((data: Product[]) => {
        // assert
        expect(data.length).toEqual(mock.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mock);
    });

    it('should send query params with limit 10 and offset 3', (doneFn) => {
      // arrange
      const mock: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;
      // act
      productsService.getAll(limit, offset).subscribe((data: Product[]) => {
        // assert
        expect(data.length).toEqual(mock.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      const params = request.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
    });

    it('should send query params with limit and not send any query param', (doneFn) => {
      // arrange
      const mock: Product[] = generateManyProducts(3);
      const limit = 10;
      // act
      productsService.getAll(limit).subscribe((data: Product[]) => {
        // assert
        expect(data.length).toEqual(mock.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      const params = request.request.params;
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();
    });

    it('should send query params with offset and not send any query param', (doneFn) => {
      // arrange
      const mock: Product[] = generateManyProducts(3);
      const offset = 3;
      // act
      productsService.getAll(undefined, offset).subscribe((data: Product[]) => {
        // assert
        expect(data.length).toEqual(mock.length);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      const params = request.request.params;
      expect(params.get('limit')).toBeNull();
      expect(params.get('offset')).toBeNull();
    });
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      // arrange
      const mock = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new test',
        price: 200,
        images: ['img'],
        description: 'test',
        categoryId: 1,
      };
      // act
      productsService.create({ ...dto }).subscribe((response) => {
        // assert
        expect(response).toEqual(mock);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      expect(request.request.body).toEqual(dto);
      expect(request.request.method).toEqual('POST');
    });
  });

  describe('test for update', () => {
    it('should update product', (doneFn) => {
      // arrange
      const mock = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'update test',
      };
      const productId = '1';

      // act
      productsService.update(productId, {...dto}).subscribe((response) => {
        // assert
        expect(response).toEqual(mock);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      expect(request.request.body).toEqual(dto);
      expect(request.request.method).toEqual('PUT');
    });
  });

  describe('test for delete', () => {
    it('should update product', (doneFn) => {
      // arrange
      const mock = true;
      const productId = '1'

      // act
      productsService.delete(productId).subscribe((response) => {
        // assert
        expect(response).toEqual(mock);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const request = httpController.expectOne(url);
      request.flush(mock);
      expect(request.request.method).toEqual('DELETE');
    });
  });
});
