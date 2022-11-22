import { Component, DebugElement } from '@angular/core';
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

  it('should raise select event when do click', () => {
    const expectedPerson = new Person('Karen', 'Hernandez', 27, 89, 1.6);
    component.person = expectedPerson;
    const debugButton = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected.subscribe((person) => (selectedPerson = person));

    debugButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(selectedPerson).toEqual(expectedPerson);
  });
});

@Component({
  template: `<app-person
    [person]="person"
    (onSelected)="onSelected($event)"
  ></app-person>`,
})
class HostComponent {
  person = new Person('Omar', 'Cruz', 27, 89, 1.6);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    // arrange
    const expectName = component.person.name;
    const h3Element = fixture.debugElement.query(
      By.css('app-person h3')
    ).nativeElement;
    // act
    fixture.detectChanges();
    // asset
    expect(h3Element.textContent).toContain(expectName);
  });

  it('should raise selected event when clicked', () => {
    // arrange
    const expectName = component.person.name;
    const buttonDebug = fixture.debugElement.query(
      By.css('app-person .btn-choose')
    );
    // act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // asset
    expect(component.selectedPerson).toEqual(component.person);
  });
});
