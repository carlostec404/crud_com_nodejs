function validarUsuario(usuario) {
  if (!usuario.name || !usuario.email || !usuario.password || !usuario._id) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  if (usuario.password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }

  if (!usuario.email.includes("@")) {
    throw new Error("Email inválido.");
  }

  return `Usuário ${usuario.name} validado com sucesso!`;
}

const usuario1 = {
  name: "carlos  alberto",
  email: "carlos.dev404@gmail.com",
  password: "123456",
  _id: "JAHirnmCcs2JLzw7"
};

const usuario2 = {
  name: "teste",
  email: "teste@teste",
  password: "1234876",  // correção de senha
  _id: "NaIS1aGgXmYijHVZ"
};

// Testando os usuários
try {
  console.log(validarUsuario(usuario1));
} catch (erro) {
  console.error("Erro ao validar usuario1:", erro.message);
}

try {
  console.log(validarUsuario(usuario2));
} catch (erro) {
  console.error("Erro ao validar usuario2:", erro.message);
}