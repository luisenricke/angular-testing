import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should be return "some value"', () => {
      expect(service.getValue()).toBe('some value');
      service.setValue('other value');
      expect(service.getValue()).toBe('other value');
    });
  });

  describe('Test for getPromiseValue', () => {
    it('should be return a value from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('Promise value');
        doneFn();
      });
    });

    it('should be return a value from promise with async/await', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('Promise value');
    });
  });

  describe('Test for getObservableValue', () => {
    it('should be return a value from observable with subscribe', (doneFn) => {
      service.getObservable().subscribe((value) => {
        expect(value).toBe('Observable value');
        doneFn();
      });
    });

    it('should be return a value from observable with async/await', async () => {
      const value = await firstValueFrom(service.getObservable());
      expect(value).toBe('Observable value');
    });
  });
});
