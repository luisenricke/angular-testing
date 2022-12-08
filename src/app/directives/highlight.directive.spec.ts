import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <p class="first" highlight>Default color</p>
    <p highlight="red">Static color</p>
    <p highlight="yellow">Other static color</p>
    <p>No highlight</p>
    <input [(ngModel)]="color" [highlight]="color" />
  `,
})
class HostComponent {
  color = 'orange';
}

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a host component', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlight elements', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highlight])')); // TODO fix selector to wrap the input
    expect(elements.length).toEqual(4);
    expect(elementsWithout.length).toEqual(2);
  });

  it('should the elements be match with backgroundColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('red');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('yellow');
  });

  it('should the p.first be default color', () => {
    const element = fixture.debugElement.query(By.css('.first'));
    const directive = element.injector.get(HighlightDirective);
    expect(element.nativeElement.style.backgroundColor).toEqual(directive.defaultColor);
  });

  it('should bind <input> and change the backgroundColor', () => {
    const element = fixture.debugElement.query(By.css('input'));
    const input: HTMLInputElement = element.nativeElement;

    expect(input.style.backgroundColor).toEqual('orange');
    input.value = 'green';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(input.style.backgroundColor).toEqual('green');
    expect(component.color).toEqual('green');
  });

});
