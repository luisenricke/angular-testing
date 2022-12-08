import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <p class="first" highlight>Default color</p>
    <p highlight="red">Static color</p>
    <p highlight="yellow">Other static color</p>
    <p>No highlight</p>
  `,
})
class HostComponent { }

describe('HighlightDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, HighlightDirective],
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
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highlight])'));
    expect(elements.length).toEqual(3);
    expect(elementsWithout.length).toEqual(1);
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

});
