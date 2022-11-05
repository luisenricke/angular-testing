import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  person: Person = new Person('Luis', 'Villalobos', 27, 80, 1.71);
  constructor() {}

  ngOnInit(): void {}
}
