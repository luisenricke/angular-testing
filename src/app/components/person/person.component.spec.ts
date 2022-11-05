import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

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

  it('should name be "Luis"', () => {
    component.person = new Person('Luis', 'Villalobos', 27, 80, 1.71);
    expect(component.person.name).toEqual('Luis');
  });

  it('should have <p> with "{person.height}"', () => {
    // arrange
    component.person = new Person('Alma', 'Sanchez', 25, 75, 1.61);
    const debugElement: DebugElement = fixture.debugElement;
    const debugQuery: DebugElement = debugElement.query(By.css('p'));
    const p: HTMLElement = debugQuery.nativeElement;

    // act
    fixture.detectChanges();

    expect(p?.textContent).toContain(component.person.height);
  });

  it('should have <h3> with "{person.name}"', () => {
    // arrange
    component.person = new Person('Joaquin', 'Cruz', 27, 78, 1.75);
    const expectedMessage = `Hi, ${component.person.name}`;
    const debugElement: DebugElement = fixture.debugElement;
    const debugQuery: DebugElement = debugElement.query(By.css('h3'));
    const h3: HTMLElement = debugQuery.nativeElement;

    // act
    fixture.detectChanges();

    // assert
    expect(h3?.textContent).toEqual(expectedMessage);
  });
});
