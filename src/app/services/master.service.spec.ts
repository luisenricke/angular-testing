import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    // service = new MasterService();
  });

  it('should be return "some value" from the other reference of service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('some value');
  });

  it('should be return "fake value" from the fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(
      fakeValueService as unknown as ValueService
    );
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should be return "object value" from fake object', () => {
    const fake = { getValue: () => 'fake from object' };
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from object');
  });
});
