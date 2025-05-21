const usuarios = [
  { name: "João", email: "joao@email.com", _id: "123" },
  { name: "Maria", email: "maria@email.com", _id: "456" },
  { name: "Carlos", email: "carlosemail.com", _id: "789" } // email inválido para testar
];

function validarUsuario(usuario) {
  if (!usuario.email || !usuario.email.includes("@")) {
    throw new Error("Email inválido");
  }
  return `Usuário ${usuario.name} validado com sucesso!`;
}

function gerarRelatorioUsuarios(usuarios) {
  const usuariosValidos = [];

  usuarios.forEach(usuario => {
    try {
      const mensagem = validarUsuario(usuario);
      console.log(mensagem);
      usuariosValidos.push(usuario);
    } catch (erro) {
      console.warn(`Erro ao validar usuário ${usuario.name}: ${erro.message}`);
    }
  });

  console.log("\nRelatório de Usuários Válidos:");
  usuariosValidos.forEach(usuario => {
    console.log(`- Nome: ${usuario.name}, Email: ${usuario.email}, ID: ${usuario._id}`);
  });
}

gerarRelatorioUsuarios(usuarios);
