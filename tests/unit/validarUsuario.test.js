// tests/unit/validarUsuario.test.js

// Importando a função validarUsuario do arquivo principal
const fs = require('fs');
const path = require('path');

// Carregando a função validarUsuario diretamente do arquivo
const validarUsuarioPath = path.join(__dirname, '../../validarUsuario.js');
const validarUsuarioContent = fs.readFileSync(validarUsuarioPath, 'utf8');

// Extraindo a função validarUsuario do conteúdo do arquivo
// Esta abordagem é usada porque o arquivo original não exporta a função
const validarUsuarioFnMatch = validarUsuarioContent.match(/function validarUsuario\([\s\S]*?return[^}]*}/);
const validarUsuarioFnStr = validarUsuarioFnMatch ? validarUsuarioFnMatch[0] : '';

// Criando a função a partir da string extraída
const validarUsuario = new Function('usuario', 
  validarUsuarioFnStr.replace('function validarUsuario(usuario) {', '').replace(/return[^;]*;/, 'return arguments[0];')
);

describe('Testes para validarUsuario', () => {
  
  test('Deve validar um usuário com dados corretos', () => {
    // Arrange
    const usuarioValido = {
      name: "João Silva",
      email: "joao@example.com",
      password: "123456",
      _id: "abc123"
    };
    
    // Act & Assert
    expect(() => {
      validarUsuario(usuarioValido);
    }).not.toThrow();
  });

  test('Deve lançar erro quando faltam campos obrigatórios', () => {
    // Arrange
    const usuarioSemNome = {
      email: "joao@example.com",
      password: "123456",
      _id: "abc123"
    };
    
    // Act & Assert
    expect(() => {
      validarUsuario(usuarioSemNome);
    }).toThrow("Todos os campos são obrigatórios.");
  });

  test('Deve lançar erro quando a senha tem menos de 6 caracteres', () => {
    // Arrange
    const usuarioSenhaCurta = {
      name: "João Silva",
      email: "joao@example.com",
      password: "12345", // Senha com apenas 5 caracteres
      _id: "abc123"
    };
    
    // Act & Assert
    expect(() => {
      validarUsuario(usuarioSenhaCurta);
    }).toThrow("A senha deve ter pelo menos 6 caracteres.");
  });

  test('Deve lançar erro quando o email é inválido', () => {
    // Arrange
    const usuarioEmailInvalido = {
      name: "João Silva",
      email: "joaoexample.com", // Email sem @
      password: "123456",
      _id: "abc123"
    };
    
    // Act & Assert
    expect(() => {
      validarUsuario(usuarioEmailInvalido);
    }).toThrow("Email inválido.");
  });
});
