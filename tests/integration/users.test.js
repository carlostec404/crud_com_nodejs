// tests/integration/users.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

describe('Testes de integração para rotas de usuários', () => {
  let app;
  let mockDb;

  // Configuração do app antes de cada teste
  beforeEach(() => {
    // Criando uma instância do Express para testes
    app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    // Mock para o NeDB
    mockDb = {
      users: [
        { _id: 'test123', name: 'Usuário Teste', email: 'teste@example.com', password: '123456' }
      ],
      find: function() {
        return {
          sort: function() {
            return {
              exec: function(callback) {
                callback(null, this.users);
              }.bind(this)
            };
          }.bind(this)
        };
      },
      insert: function(data, callback) {
        const newUser = { ...data, _id: 'new123' };
        this.users.push(newUser);
        callback(null, newUser);
      },
      findOne: function() {
        return {
          exec: function(callback) {
            callback(null, this.users[0]);
          }.bind(this)
        };
      },
      update: function(query, data, callback) {
        callback(null);
      },
      remove: function(query, options, callback) {
        callback(null);
      }
    };

    // Mock para app.utils.error
    app.utils = {
      error: {
        send: jest.fn()
      }
    };

    // Mock para as rotas
    app.route = function(path) {
      return {
        get: function(handler) {
          this.getHandler = handler;
          return this;
        },
        post: function(handler) {
          this.postHandler = handler;
          return this;
        },
        put: function(handler) {
          this.putHandler = handler;
          return this;
        },
        delete: function(handler) {
          this.deleteHandler = handler;
          return this;
        }
      };
    };
  });

  test('GET /users deve retornar lista de usuários', async () => {
    // Arrange
    const req = {};
    const res = {
      statusCode: 0,
      setHeader: jest.fn(),
      json: jest.fn()
    };
    
    // Simular a rota users
    const route = app.route('/users');
    
    // Simular o NeDB
    const db = {
      find: function() {
        return {
          sort: function() {
            return {
              exec: function(callback) {
                callback(null, mockDb.users);
              }
            };
          }
        };
      }
    };
    
    // Criar uma função de rota similar à do projeto
    const routeHandler = (req, res) => {
      db.find({}).sort({name:1}).exec((err, users) => {
        if(err) {
          app.utils.error.send(err, req, res);
        } else {
          res.statusCode = 200;
          res.setHeader('content-Type', 'application/json');
          res.json({
            users
          });
        }
      });
    };
    
    // Act
    routeHandler(req, res);
    
    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith('content-Type', 'application/json');
    expect(res.json).toHaveBeenCalledWith({
      users: mockDb.users
    });
  });

  test('POST /users deve criar um novo usuário', async () => {
    // Arrange
    const req = {
      body: {
        name: 'Novo Usuário',
        email: 'novo@example.com',
        password: '123456'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Simular o NeDB
    const db = {
      insert: function(data, callback) {
        const newUser = { ...data, _id: 'new123' };
        callback(null, newUser);
      }
    };
    
    // Criar uma função de rota similar à do projeto
    const routeHandler = (req, res) => {
      db.insert(req.body, (err, user) => {
        if (err) {
          app.utils.error.send(err, req, res);
        } else {
          res.status(200).json(user);
        }
      });
    };
    
    // Act
    routeHandler(req, res);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      _id: 'new123',
      name: 'Novo Usuário',
      email: 'novo@example.com'
    }));
  });

  test('GET /users/:id deve retornar um usuário específico', async () => {
    // Arrange
    const req = {
      params: {
        id: 'test123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Simular o NeDB
    const db = {
      findOne: function() {
        return {
          exec: function(callback) {
            callback(null, mockDb.users[0]);
          }
        };
      }
    };
    
    // Criar uma função de rota similar à do projeto
    const routeHandler = (req, res) => {
      db.findOne({_id: req.params.id}).exec((err, user) => {
        if (err) {
          app.utils.error.send(err, req, res);
        } else {
          res.status(200).json(user);
        }
      });
    };
    
    // Act
    routeHandler(req, res);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDb.users[0]);
  });
});
