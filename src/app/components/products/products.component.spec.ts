import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { async, defer, of } from 'rxjs';

import { generateManyProducts } from '../../models/product.mock';
import { ProductService } from '../../services/product.service';
import { ValueService } from '../../services/value.service';
import { ProductComponent } from '../product/product.component';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      // arrange
      const productsMock = generateManyProducts(10);
      const previousProducts = [...component.products];
      productService.getAll.and.returnValue(of(productsMock));

      // act
      component.getAllProducts();
      fixture.detectChanges();

      // assert
      expect(component.products).toEqual([...previousProducts, ...productsMock]);
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      // arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));

      // act
      component.getAllProducts();
      fixture.detectChanges();

      // assert
      expect(component.status).toEqual('loading');
      tick(); //  resolve pending Observables or Promises.
      fixture.detectChanges();
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      // arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));

      // act
      component.getAllProducts();
      fixture.detectChanges();

      // assert
      expect(component.status).toEqual('loading');
      tick(4_000); //  resolve pending Observables or Promises.
      fixture.detectChanges();
      expect(component.status).toEqual('error');
    }));
  });

  describe('test for callPromise', () => {
    it('should call to promise', async () => {
      // arrange
      const mockMessage = 'mocking string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));

      // act
      await component.callPromise();
      fixture.detectChanges();

      // assert
      expect(component.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
    });

    it('should show "mocking string" in <p> when button was clicked', fakeAsync(() => {
      // arrange
      const mockMessage = 'mocking string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMessage));
      const buttonDebug = fixture.debugElement.query(By.css('.btn-promise'));

      // act
      buttonDebug.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const pDebug = fixture.debugElement.query(By.css('p.rta'));

      // assert
      expect(component.rta).toEqual(mockMessage);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(pDebug.nativeElement.textContent).toEqual(mockMessage);
    }));
  });
});
