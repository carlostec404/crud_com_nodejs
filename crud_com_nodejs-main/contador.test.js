// Função com estado interno (contador)
function criarContador() {
  let contador = 0;

  return {
    incrementar: () => {
      contador++;
    },
    resetar: () => {
      contador = 0;
    },
    getValor: () => contador,
  };
}

// Testes Jest para o contador
describe('Testando contador com estado interno', () => {
  let contador;

  beforeEach(() => {
    contador = criarContador();
  });

  test('inicia com zero', () => {
    expect(contador.getValor()).toBe(0);
  });

  test('incrementa o contador', () => {
    contador.incrementar();
    expect(contador.getValor()).toBe(1);
  });

  test('incrementa múltiplas vezes', () => {
    contador.incrementar();
    contador.incrementar();
    contador.incrementar();
    expect(contador.getValor()).toBe(3);
  });

  test('reseta o contador', () => {
    contador.incrementar();
    contador.resetar();
expect(contador.getValor()).toBe(0);
});
test('reseta o contador após múltiplos incrementos', () => {
    contador.incrementar();
    contador.incrementar();
    contador.resetar();
    expect(contador.getValor()).toBe(0);
  });
});