import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {

  people: Person[] = [
    new Person('Luis', 'Villalobos', 27, 95, 1.71),
    new Person('Francisco', 'Chavez', 30, 80, 1.51),
  ];
  selectedPerson: Person | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

  choose(person: Person) {
    this.selectedPerson = person
  }

}
