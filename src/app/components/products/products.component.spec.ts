import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { generateManyProducts } from '../../models/product.mock';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ValueService', ['getAll']);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call to service', () => {
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
    expect(productService.getAll).toHaveBeenCalled();
  })
});
