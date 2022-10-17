import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Test for multiply', () => {
    it('should return a nine', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.multiply(3, 3);
      // Assert
      expect(result).toEqual(9);
    });

    it('should return a four', () => {
      // Arrange
      const calculator = new Calculator();
      // Act
      const result = calculator.multiply(1, 4);
      // Assert
      expect(result).toEqual(4);
    });
  });

  describe('Test for divide', () => {
    it('should return a numbers', () => {
      // Arrange
      const calculator = new Calculator();
      // Act & Assert
      expect(calculator.divide(6, 3)).toEqual(2);
      expect(calculator.divide(10, 2)).toEqual(5);
    });

    it('should return null with zero', () => {
      // Arrange
      const calculator = new Calculator();
      // Act & Assert
      expect(calculator.divide(2, 0)).toBeNull();
    });
  });

  it('Test for matchers', () => {
    const name = 'Luis';
    let lastName;

    expect(name).toBeDefined();
    expect(lastName).toBeUndefined();

    expect(1 + 1 === 2).toBeTruthy();
    expect(1 + 1 === 0).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(10).toBeGreaterThan(5);

    expect('test it').toMatch(/test/);
    expect([1, 2, 3, 4, 5, 6, 7]).toContain(1);
  });
});
