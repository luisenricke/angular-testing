import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have <p> with "Lorem ipsum"', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const debugQuery: DebugElement = debugElement.query(By.css('p'));
    const p: HTMLElement = debugQuery.nativeElement;

    expect(p?.textContent).toContain('Lorem ipsum');
  });

  it('should have <h3> with "Lorem ipsum"', () => {
    const debugElement: DebugElement = fixture.debugElement;
    const debugQuery: DebugElement = debugElement.query(By.css('h3'));
    const h3: HTMLElement = debugQuery.nativeElement;

    expect(h3?.textContent).toEqual('Hi, PersonComponent');
  });
});
