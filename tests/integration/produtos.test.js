// tests/integration/produtos.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const path = require('path');

describe('Testes de integração para rotas de produtos', () => {
  let app;
  let produtoId;

  // Configuração do app antes de cada teste
  beforeEach(() => {
    // Criando uma instância do Express para testes
    app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // Configurando o diretório raiz para o consign encontrar as pastas
    const rootDir = path.join(__dirname, '../..');
    
    // Carregando rotas e utilitários com consign
    consign({ cwd: rootDir })
      .include('routes')
      .include('ultils')
      .into(app);
  });

  test('GET /produtos deve retornar lista de produtos', async () => {
    // Act
    const response = await request(app)
      .get('/produtos')
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Assert
    expect(response.body).toHaveProperty('produtos');
    expect(Array.isArray(response.body.produtos)).toBe(true);
  });

  test('POST /produtos deve criar um novo produto', async () => {
    // Arrange
    const novoProduto = {
      nome: 'Produto Teste',
      preco: 99.99,
      descricao: 'Produto para teste de integração'
    };
    
    // Act
    const response = await request(app)
      .post('/produtos')
      .send(novoProduto)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Assert
    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe(novoProduto.nome);
    expect(response.body.preco).toBe(novoProduto.preco);
    
    // Salvar o ID para uso em outros testes
    produtoId = response.body._id;
  });

  test('GET /produtos/:id deve retornar um produto específico', async () => {
    // Pular o teste se não tiver um ID de produto
    if (!produtoId) {
      return;
    }
    
    // Act
    const response = await request(app)
      .get(`/produtos/${produtoId}`)
      .expect('Content-Type', /json/)
      .expect(200);
    
    // Assert
    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome');
    expect(response.body).toHaveProperty('preco');
  });
});
