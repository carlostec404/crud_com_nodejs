const calc = require('../models/calculadora');

describe('Testes da Calculadora', () => {
  test('somar 2 + 3 = 5', () => {
    expect(calc.somar(2, 3)).toBe(5);
  });

  test('subtrair 5 - 3 = 2', () => {
    expect(calc.subtrair(5, 3)).toBe(2);
  });

  test('multiplicar 4 * 3 = 12', () => {
    expect(calc.multiplicar(4, 3)).toBe(12);
  });

  test('dividir 10 / 2 = 5', () => {
    expect(calc.dividir(10, 2)).toBe(5);
  });

  test('dividir por zero lança erro', () => {
    expect(() => calc.dividir(10, 0)).toThrow('Divisão por zero');
  });
});
