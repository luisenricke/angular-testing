import { Observable, of } from 'rxjs';

export class FakeValueService {
  private value = 'fake value';

  constructor() {}

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {}

  getPromiseValue(): Promise<string> {
    return Promise.resolve('Fake promise value');
  }
}
