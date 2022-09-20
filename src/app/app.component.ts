import { Component, OnInit } from '@angular/core';

import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-testing';

  ngOnInit(): void {
    const calculator = new Calculator();

    const multiply = calculator.multiply(1, 2);
    console.log(multiply === 2);

    const divide = calculator.divide(3, 0);
    console.log(divide === null);
  }
}
