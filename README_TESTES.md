# Testes Unitários e de Integração para CRUD com Node.js

Este documento explica como usar os testes unitários e de integração criados para o seu projeto CRUD com Node.js.

## Estrutura dos Testes

Os testes estão organizados em duas categorias:

```
tests/
├── unit/               # Testes unitários
│   └── validarUsuario.test.js
└── integration/        # Testes de integração
    ├── users.test.js
    └── produtos.test.js
```

## Testes Unitários

Os testes unitários verificam o funcionamento isolado de componentes específicos da aplicação:

- **validarUsuario.test.js**: Testa a função de validação de usuários, verificando:
  - Validação de usuários com dados corretos
  - Validação de campos obrigatórios
  - Validação de tamanho mínimo de senha
  - Validação de formato de email

## Testes de Integração

Os testes de integração verificam o funcionamento conjunto de múltiplos componentes:

- **users.test.js**: Testa as rotas de usuários:
  - GET /users (listagem)
  - POST /users (criação)
  - GET /users/:id (busca por ID)

- **produtos.test.js**: Testa as rotas de produtos:
  - GET /produtos (listagem)
  - POST /produtos (criação)
  - GET /produtos/:id (busca por ID)

## Como Executar os Testes

1. Certifique-se de ter as dependências instaladas:
   ```
   npm install
   ```

2. Execute todos os testes:
   ```
   npm test
   ```

3. Execute apenas os testes unitários:
   ```
   npm run test:unit
   ```

4. Execute apenas os testes de integração:
   ```
   npm run test:integration
   ```

## Notas Importantes

- Os testes de integração usam mocks para simular o banco de dados, evitando dependências externas
- Os testes são simples e focados em demonstrar o conceito de testes unitários e de integração
- Você pode expandir esses testes adicionando mais casos de teste conforme necessário

## Apresentação dos Testes

Para apresentar os testes:

1. Mostre a estrutura de arquivos e explique a diferença entre testes unitários e de integração
2. Execute os testes com `npm test` para demonstrar que eles passam
3. Explique o código de um ou dois testes para mostrar como eles funcionam
4. Destaque a importância dos testes para garantir a qualidade do código

Estes testes foram criados especificamente para o seu projeto CRUD com Node.js e estão prontos para serem apresentados.
