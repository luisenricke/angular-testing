export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weight: number,
    public height: number
  ) {}

  calcIMC(): string {
    const imc = Math.round(this.weight / (this.height * this.height));
    if (imc >= 40) {
      return 'overweight level 3';
    } else if (imc >= 30) {
      return 'overweight level 2';
    } else if (imc >= 27) {
      return 'overweight level 1';
    } else if (imc >= 25) {
      return 'overweight';
    } else if (imc >= 18) {
      return 'normal';
    } else if (imc >= 0) {
      return 'down';
    } else {
      return 'not found';
    }
  }
}
