import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      // arrange
      const mock: Auth = { access_token: '123' };
      const email = 'prueba@correo.com';
      const password = 'password';
      // act
      authService.login(email, password).subscribe((data: Auth) => {
        // assert
        expect(data).toEqual(mock);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/auth/login`;
      const request = httpController.expectOne(url);
      request.flush(mock);
    });

    it('should call to saveToken', (doneFn) => {
      // arrange
      const mock: Auth = { access_token: '123' };
      const email = 'prueba@correo.com';
      const password = 'password';

      spyOn(tokenService, 'saveToken').and.callThrough();
      // act
      authService.login(email, password).subscribe((data: Auth) => {
        // assert
        expect(data).toEqual(mock);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith('123');
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/auth/login`;
      const request = httpController.expectOne(url);
      request.flush(mock);
    });
  });
});
