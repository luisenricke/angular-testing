import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';
import { FakeValueService } from './value-fake.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const valueServiceObjectSpy = jasmine.createSpyObj('ValueService', [
      'getValue',
    ]);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: valueServiceObjectSpy },
      ],
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(
      ValueService
    ) as jasmine.SpyObj<ValueService>;
  });
  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });
  /*
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
 */
  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value from spy');
    expect(masterService.getValue()).toBe('fake value from spy');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });
});
