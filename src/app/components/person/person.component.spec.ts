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

  it('should display a text with imc when executes calcIMC', () => {
    // arrange
    component.person = new Person('Alejandro', 'Keaton', 29, 150, 1.78);
    const expectedMessage = 'overweight level 3';
    const button: HTMLElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    ).nativeElement;

    // act
    component.calcIMC();
    fixture.detectChanges();

    // assert
    expect(button?.textContent).toContain(expectedMessage);
  });

  it('should display a text with imc when clicked button', () => {
    // arrange
    component.person = new Person('Alejandro', 'Keaton', 29, 150, 1.78);
    const expectedMessage = 'overweight level 3';
    const debugButton: DebugElement = fixture.debugElement.query(
      By.css('button.btn-imc')
    );
    const button: HTMLElement = debugButton.nativeElement;

    // act
    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // assert
    expect(button?.textContent).toContain(expectedMessage);
  });
});
