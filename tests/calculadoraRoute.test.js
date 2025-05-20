const request = require('supertest');
const app = require('../index'); // seu app express

describe('Rota /calculadora', () => {
  test('POST /calculadora com operação somar deve retornar resultado correto', async () => {
    const response = await request(app)
      .post('/calculadora')
      .send({ operacao: 'somar', a: 10, b: 5 });

    expect(response.statusCode).toBe(200);
    expect(response.body.resultado).toBe(15);
  });

  test('POST /calculadora com divisão por zero retorna erro', async () => {
    const response = await request(app)
      .post('/calculadora')
      .send({ operacao: 'dividir', a: 10, b: 0 });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Divisão por zero');
  });

  test('POST /calculadora com operação inválida retorna erro', async () => {
    const response = await request(app)
      .post('/calculadora')
      .send({ operacao: 'potencia', a: 2, b: 3 });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Operação inválida');
  });
});
