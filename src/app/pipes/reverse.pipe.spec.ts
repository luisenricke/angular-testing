import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform('roma');
    expect(rta).toEqual('amor');
  });

});

@Component({
  template: `
    <h5>{{ 'amor' | reverse }}</h5>
    <input [(ngModel)]="text"/>
    <p>{{ text | reverse }}</p>
  `,
})
class HostComponent {
  text = '';
}

describe('HighlightDirective from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReversePipe],
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

  it('should the h5 be "roma"', () => {
    const element = fixture.debugElement.query(By.css('h5'));
    expect(element.nativeElement.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = input.nativeElement;
    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toEqual('');

    inputElement.value = 'text';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(p.nativeElement.textContent).toEqual('txet');
  });
});
