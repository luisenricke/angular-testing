import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Person } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';
import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    // arrange
    component.people = [
      new Person('Luis', 'Villalobos', 27, 95, 1.71),
      new Person('Francisco', 'Chavez', 30, 80, 1.51),
      new Person('Julia', 'Perez', 22, 71, 1.51),
    ];

    // act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    // assert
    expect(debugElement.length).toEqual(3);
  });
});
